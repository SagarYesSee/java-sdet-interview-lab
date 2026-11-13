const LIMIT = 1_000_000;
export function validData(data) {
  return data && typeof data === 'object' && !Array.isArray(data) && Object.entries(data).every(([id, fields]) =>
    /^[A-Z][0-9]{2}$/.test(id) && fields && typeof fields === 'object' && !Array.isArray(fields) &&
    Object.entries(fields).every(([key, item]) => ['done', 'draft', 'pyDraft'].includes(key) && item &&
      Number.isSafeInteger(item.at) && item.at >= 0 &&
      (key === 'done' ? typeof item.value === 'boolean' : typeof item.value === 'string' && item.value.length <= 100_000)));
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const headers = {'Content-Type':'application/json', 'Cache-Control':'no-store', 'Vary':'Origin'};
    if (origin === env.ALLOWED_ORIGIN) headers['Access-Control-Allow-Origin'] = origin;
    const reply = (body, status = 200) => new Response(JSON.stringify(body), {status, headers});
    if (origin && origin !== env.ALLOWED_ORIGIN) return reply({error:'Origin not allowed'}, 403);
    if (request.method === 'OPTIONS') return new Response(null, {status:204, headers:{...headers,
      'Access-Control-Allow-Methods':'GET, PUT, OPTIONS', 'Access-Control-Allow-Headers':'Authorization, Content-Type'}});
    if (new URL(request.url).pathname !== '/progress') return reply({error:'Not found'},404);
    if (!['GET','PUT'].includes(request.method)) return reply({error:'Method not allowed'},405);
    const code = request.headers.get('Authorization')?.replace(/^Bearer /,'');
    if (!/^[A-Za-z0-9_-]{43}$/.test(code || '')) return reply({error:'Invalid sync code'},401);
    const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(code)))].map(v=>v.toString(16).padStart(2,'0')).join('');
    try {
      if (request.method === 'GET') {
        const row = await env.DB.prepare('SELECT revision, data FROM saves WHERE code_hash = ?').bind(hash).first();
        return row ? reply({revision:row.revision,data:JSON.parse(row.data)}) : reply({error:'Code not found'},404);
      }
      if (Number(request.headers.get('Content-Length')) > LIMIT) return reply({error:'Save too large'},413);
      // Bound the stream as well, including requests without Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return reply({error:'Missing save'},400);
      let size=0, chunks=[];
      while (true) {const {done,value}=await reader.read(); if(done)break; size+=value.length;
        if(size>LIMIT){await reader.cancel();return reply({error:'Save too large'},413);} chunks.push(value);}
      const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
      let body;try{body=JSON.parse(new TextDecoder().decode(bytes));}catch{return reply({error:'Invalid JSON'},400);}
      if (!Number.isSafeInteger(body.revision) || body.revision < 0 || !validData(body.data)) return reply({error:'Invalid save'},400);
      const data=JSON.stringify(body.data);
      const result = body.revision === 0
        ? await env.DB.prepare('INSERT INTO saves (code_hash, revision, data) VALUES (?, 1, ?) ON CONFLICT DO NOTHING').bind(hash,data).run()
        : await env.DB.prepare('UPDATE saves SET data = ?, revision = revision + 1 WHERE code_hash = ? AND revision = ?').bind(data,hash,body.revision).run();
      return result.meta.changes ? reply({revision:body.revision+1}) : reply({error:'Save changed; reload and merge'},409);
    } catch {return reply({error:'Cloud save unavailable'},503);}
  }
};
