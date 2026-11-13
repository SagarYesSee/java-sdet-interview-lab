import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker,{validData} from '../cloudflare/worker.mjs';
import {mergeFields} from '../cloud-sync.mjs';

const code='a'.repeat(43),origin='https://lab.example';
const data={S01:{done:{value:true,at:10},draft:{value:'class Solution {}',at:11}}};
function database(){
  const rows=new Map();
  return {rows,prepare(sql){return {bind(...args){return {
    async first(){return rows.get(args[0])||null;},
    async run(){
      if(sql.startsWith('INSERT')){const [hash,data]=args;if(rows.has(hash))return {meta:{changes:0}};rows.set(hash,{revision:1,data});}
      else{const [data,hash,revision]=args,old=rows.get(hash);if(!old||old.revision!==revision)return {meta:{changes:0}};rows.set(hash,{data,revision:revision+1});}
      return {meta:{changes:1}};
    }
  };}};}};
}
function call(env,method='GET',body,token=code,from=origin){return worker.fetch(new Request('https://sync.example/progress',{
  method,headers:{Origin:from,Authorization:'Bearer '+token},body:body?JSON.stringify(body):undefined}),env);}
test('merges different fields and honors explicit uncompletion and empty drafts',()=>{
  const local={S01:{done:{value:true,at:1},draft:{value:'old',at:2}}};
  const remote={S01:{done:{value:false,at:3},pyDraft:{value:'',at:4}}};
  const merged=mergeFields(local,remote);
  assert.equal(merged.S01.done.value,false);assert.equal(merged.S01.draft.value,'old');assert.equal(merged.S01.pyDraft.value,'');
  assert.equal(local.S01.done.value,true);
});
test('validates save field types',()=>{
  assert.ok(validData(data));assert.ok(!validData({S01:{done:{value:'yes',at:0}}}));
  assert.ok(!validData({S01:{token:{value:'secret',at:0}}}));
});
test('create, restore, conflict protection, update, and code isolation',async()=>{
  const env={DB:database(),ALLOWED_ORIGIN:origin};
  assert.equal((await call(env)).status,404);
  assert.equal((await call(env,'PUT',{revision:0,data})).status,200);
  const loaded=await (await call(env)).json();assert.deepEqual(loaded,{revision:1,data});
  assert.equal((await call(env,'PUT',{revision:0,data:{}})).status,409);
  assert.equal((await call(env,'PUT',{revision:1,data:{}})).status,200);
  assert.equal((await call(env,'PUT',{revision:1,data})).status,409);
  assert.equal((await call(env,'GET',null,'b'.repeat(43))).status,404);
  assert.ok(![...env.DB.rows.keys()].includes(code));
});
test('rejects invalid codes, disallowed origins, malformed data and oversized bodies',async()=>{
  const env={DB:database(),ALLOWED_ORIGIN:origin};
  assert.equal((await call(env,'GET',null,'short')).status,401);
  assert.equal((await call(env,'GET',null,code,'https://other.example')).status,403);
  assert.equal((await call(env,'PUT',{revision:0,data:{S01:{done:true}}})).status,400);
  assert.equal((await call(env,'PUT',{revision:0,data:{S01:{draft:{value:'x'.repeat(1_000_000),at:0}}}})).status,413);
});
test('preflight permits Authorization and responses cannot be cached',async()=>{
  const env={DB:database(),ALLOWED_ORIGIN:origin};const response=await call(env,'OPTIONS');
  assert.equal(response.status,204);assert.equal(response.headers.get('Access-Control-Allow-Origin'),origin);
  assert.match(response.headers.get('Access-Control-Allow-Headers'),/Authorization/);
  assert.equal((await call(env)).headers.get('Cache-Control'),'no-store');
});
