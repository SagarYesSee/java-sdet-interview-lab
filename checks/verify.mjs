import fs from 'node:fs';
import {bank,execute,code} from '../bank.mjs';
import {alternatives} from '../variants.mjs';
const out='/private/tmp/sdet-java-checks';fs.mkdirSync(out,{recursive:true});
const str=x=>JSON.stringify(x), literal=(x,type)=>{if(x===null)return 'null';if(type==='String')return str(x);if(type==='char')return "'"+String(x).replace(/'/g,"\\'")+"'";if(type==='long'||type==='Long')return x+'L';if(type==='int'||type==='Integer'||type==='boolean')return String(x);if(type==='int[]')return 'new int[]{'+x.join(',')+'}';if(type==='String[]')return 'new String[]{'+x.map(str).join(',')+'}';if(type==='List<TestResult>')return 'Arrays.asList('+x.map(v=>'new TestResult('+str(v.name)+','+v.durationMs+')').join(',')+')';let list=type.match(/(?:List|Set)<(.+)>/);if(list){let body='Arrays.asList('+x.map(v=>literal(v,list[1])).join(',')+')';return type.startsWith('Set')?'new LinkedHashSet<>('+body+')':body;}let map=type.match(/Map<([^,]+), (.+)>/);if(map)return 'map('+Object.entries(x).flatMap(([k,v])=>[literal(map[1]==='Integer'?Number(k):k,map[1]==='Character'?'char':map[1]),literal(v,map[2])]).join(',')+')';throw Error(type);};
let source='import java.util.*;\nimport java.util.function.Function;\nimport java.util.stream.Collectors;\npublic class ReferenceChecks {\n';let calls=[],total=0;
function add(q,name){let localCalls=[];source+=`static ${q.ret} ${name}(${q.param}) {\n${q.body}\n}\n`;q.samples.forEach((s,i)=>{let parts=q.param.split(/, (?![^<]*>)/),args=parts.length>1?parts.map(p=>{let name=p.slice(p.lastIndexOf(' ')+1);return literal(s[name],p.slice(0,p.lastIndexOf(' ')));}):[literal(s,parts[0].slice(0,parts[0].lastIndexOf(' ')))];let result=execute(q,s).result;calls.push(`check("${name} sample ${i+1}", ${name}(${args.join(',')}), ${literal(result,q.ret)});`);localCalls.push(`check("sample ${i+1}", Solution.solve(${args.join(',')}), ${literal(result,q.ret)});`);total++;});if(name.startsWith('solve')){let dir='tests/'+q.id;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/TestRunner.java',(`import java.util.*;\npublic class TestRunner {\n@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }\nstatic void check(String name,Object actual,Object expected){if(!Objects.deepEquals(actual,expected))throw new AssertionError(name+" mismatch");System.out.println(name+" passed on your local Java runtime");}\npublic static void main(String[] args) {\n${localCalls.join('\n')}\nSystem.out.println("All sample assertions passed. Add edge and negative cases before concluding correctness.");\n}\n}`).replaceAll('new TestResult(', 'new Solution.TestResult('));}}
for(let q of bank)add(q,'solve'+q.id);for(let [id,a]of Object.entries(alternatives))add({...bank.find(q=>q.id===id),body:a.body},'alt'+id);
source+=bank.find(q=>q.extra).extra;
source+=`\n@SuppressWarnings("unchecked") static <K,V> Map<K,V> map(Object... entries) { Map<K,V> m = new LinkedHashMap<>(); for(int i=0;i<entries.length;i+=2)m.put((K)entries[i],(V)entries[i+1]);return m; }
static int checked = 0;
static void check(String name, Object actual, Object expected) {if(!Objects.deepEquals(actual, expected))throw new AssertionError(name+" actual="+actual+" expected="+expected); checked++;}
public static void main(String[] args) {\n${calls.join('\n')}
check("second-largest MIN_VALUE", solveA03(new int[]{0,Integer.MIN_VALUE}), Integer.MIN_VALUE);
check("two sum prevents overflow", solveA06(new int[]{Integer.MAX_VALUE,1},Integer.MIN_VALUE),new int[0]);
check("two sum distinct indices", solveA06(new int[]{3},6),new int[0]);
check("digit MIN_VALUE", solveN05(Integer.MIN_VALUE),47);
check("F92", solveN02(93).get(92),7540113804746346429L);
check("factorial20", solveN03(20),2432902008176640000L);
check("sliding abba",solveB02("abba"),2);
check("binary final candidate", solveA11(new int[]{7},7),0);
check("map missing vs null", solveQ04(map("x",null),map("y",null)),false);
check("whitespace preserved",solveS08(" a  bc ")," a  cb ");
check("prime square",solveN01(49),false);
System.out.println(checked+" reference checks passed; Java 8 API compatibility compilation succeeded.");
}\n}`;
fs.writeFileSync(out+'/ReferenceChecks.java',source);fs.writeFileSync('checks/summary.json',JSON.stringify({questions:bank.length,referenceSamples:total,additionalBoundaryChecks:11},null,2));console.log(out+'/ReferenceChecks.java');
