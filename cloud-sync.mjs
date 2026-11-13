import {SYNC_URL} from './sync-config.mjs';

export function mergeFields(local, remote) {
  const result=structuredClone(local);
  for(const [id,fields] of Object.entries(remote)) {
    result[id] ||= {};
    for(const [key,item] of Object.entries(fields))
      if(!result[id][key] || item.at > result[id][key].at) result[id][key]=item;
  }
  return result;
}

export function cloudSync({read, apply, notify}) {
  let code='';try{code=localStorage.getItem('sdet-sync-code')||'';}catch{}
  let busy=false,timer,status=code?'Waiting to sync':'Browser only';
  const endpoint=SYNC_URL.replace(/\/$/,'')+'/progress';
  const setStatus=text=>{status=text;const el=document.querySelector('[data-sync-status]');if(el)el.textContent=text;};
  async function request(method,token,body) {
    const response=await fetch(endpoint,{method,headers:{Authorization:'Bearer '+token,...(body?{'Content-Type':'application/json'}:{})},
      body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(15000)});
    if(!response.ok){const error=new Error(response.status===404?'Code not found. Check the code and try again.':`Cloud save failed (${response.status}).`);error.status=response.status;throw error;}
    return response.json();
  }
  async function exchange(token,create=false) {
    for(let attempt=0;attempt<4;attempt++) {
      let remote;
      try{remote=await request('GET',token);}catch(e){if(create&&e.status===404)remote={revision:0,data:{}};else throw e;}
      const data=mergeFields(read(),remote.data);
      try {
        if(JSON.stringify(data)!==JSON.stringify(remote.data)||remote.revision===0)
          await request('PUT',token,{revision:remote.revision,data});
        // Include edits made while the network request was pending.
        apply(mergeFields(read(),data));return;
      }catch(e){if(e.status!==409)throw e;}
    }
    throw new Error('Another device is saving. Try syncing again.');
  }
  async function sync(){
    if(!code||!SYNC_URL||busy)return;
    busy=true;setStatus('Syncing…');
    try{await exchange(code);setStatus('Synced');}catch{setStatus('Saved locally · sync retry pending');}finally{busy=false;}
  }
  function schedule(){if(code){setStatus('Saved locally · sync pending');clearTimeout(timer);timer=setTimeout(sync,900);}}
  function dialog(){
    const d=document.createElement('dialog');d.className='sync-dialog';
    d.innerHTML=`<h2>Save across devices</h2><p>No sign-in needed. Create a private code here, then paste it on your other devices.</p>
      <p>Keep the code safe: anyone with it can read and change your progress and drafts. A lost code cannot be recovered.</p>
      <label>Sync code <input id="syncCode" type="password" autocomplete="off" spellcheck="false" aria-label="Sync code"></label>
      <div class="row sectiongap"><button id="showSync">Show code</button><button id="copySync">Copy code</button></div>
      <p>Connecting combines this browser’s progress with the cloud save. The newest change to each completion or draft wins.</p>
      <p id="syncMessage" role="status"></p><div class="row sectiongap"><button id="createSync">Create new code</button><button id="connectSync">Connect & sync</button><button id="disconnectSync">Disconnect</button><button id="closeSync">Close</button></div>`;
    document.body.append(d);d.showModal();d.onclose=()=>d.remove();
    const input=d.querySelector('input'),msg=d.querySelector('#syncMessage');input.value=code;
    msg.textContent=SYNC_URL?status:'Cloud saves need a deployed backend. Set SYNC_URL in sync-config.mjs first.';
    d.querySelector('#closeSync').onclick=()=>d.close();
    d.querySelector('#showSync').onclick=()=>{input.type=input.type==='password'?'text':'password';};
    d.querySelector('#copySync').onclick=async()=>{try{await navigator.clipboard.writeText(input.value);msg.textContent='Code copied.';}catch{input.type='text';input.select();msg.textContent='Select and copy the code.';}};
    d.querySelector('#disconnectSync').onclick=()=>{if(busy)return;code='';try{localStorage.removeItem('sdet-sync-code');}catch{}setStatus('Browser only');input.value='';msg.textContent='Disconnected. Progress remains saved in this browser.';};
    async function connect(create){
      if(busy||!SYNC_URL)return;
      const token=create?btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''):input.value.trim();
      if(!/^[A-Za-z0-9_-]{43}$/.test(token)){msg.textContent='Paste the full 43-character sync code.';return;}
      busy=true;msg.textContent='Connecting…';
      try{await exchange(token,create);code=token;input.value=code;
        try{localStorage.setItem('sdet-sync-code',code);}catch{notify('Code could not be remembered. Copy it before closing.');}
        setStatus('Synced');msg.textContent=create?'Save created. Copy your code and keep it somewhere safe.':'Connected. Your progress and drafts are synced.';
      }catch(e){msg.textContent=e.message;}finally{busy=false;}
    }
    d.querySelector('#createSync').onclick=()=>connect(true);
    d.querySelector('#connectSync').onclick=()=>connect(false);
  }
  window.addEventListener('online',sync);
  window.addEventListener('focus',sync);
  setInterval(sync,20000);
  setTimeout(sync,0);
  return {schedule,dialog,status:()=>status};
}
