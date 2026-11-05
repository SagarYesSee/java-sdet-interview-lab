// Stable IDs preserve progress as the bank expands. All methods target Java 8+.
export const bank=[];
function add(id,topic,title,pattern,param,ret,body,samples,run,complexity,space,idea,edges,follow,difficulty='Easy',qa=''){
 bank.push({id,topic,title,pattern,param,ret,body,samples,run,complexity,space,idea,edges,follow,difficulty,qa,time:difficulty==='Medium'?20:difficulty==='Beginner'?10:15,source:'Core interview practice',date:null,url:null});
}
const snap=(input,fn)=>{let steps=[];const emit=(line,explanation,vars={},cells=[],active=[],map=[],pointers={})=>steps.push({line,explanation,vars,cells:[...cells],active:[...active],map:map.map(x=>[...x]),pointers:{...pointers}});emit('', 'Read the input and establish the contract.',{input:JSON.stringify(input)},Array.isArray(input)?input:typeof input==='string'?input.split(''):Array.isArray(input?.a)?input.a:[]);let result=fn(emit);emit('','Return the result.',{result:JSON.stringify(result)},Array.isArray(result)?result:typeof result==='string'?result.split(''):[],[],result&&typeof result==='object'&&!Array.isArray(result)?(steps[steps.length-1].map.length?steps[steps.length-1].map:Object.entries(result)):[]);return {steps,result};};
const freq=(s,e)=>{let m=new Map();[...s].forEach((c,i)=>{m.set(c,(m.get(c)||0)+1);e('counts.put','Insert a new key or increment its count.',{i,c,count:m.get(c)},[...s],[i],[...m]);});return m};
const arr='new int[]{';
add('S01','Strings','Reverse a string','Two pointers','String s','String',`if (s == null) throw new IllegalArgumentException("null");
char[] a = s.toCharArray();
int left = 0, right = a.length - 1;
while (left < right) {
    char temp = a[left];
    a[left] = a[right];
    a[right] = temp;
    left++; right--;
}
return new String(a);`,['automation','a',''],s=>snap(s,e=>{let a=s.split(''),l=0,r=a.length-1;while(l<r){let t=a[l];e('char temp','Save the left character.',{temp:t,left:l,right:r},a,[l,r],[],{left:l,right:r});a[l]=a[r];e('a[left] =','Copy the right character to the left.',{temp:t,left:l,right:r},a,[l,r]);a[r]=t;e('a[right] =','Complete the swap.',{temp:t,left:l,right:r},a,[l,r]);l++;r--;e('left++;','Move both pointers inward.',{left:l,right:r},a,[],[],{left:l,right:r});}return a.join('')}),'O(n)','O(n)','Swap the outside characters, then move inward. Each pair is placed once.',['Empty → ""','One character stays unchanged','Case and spaces are preserved'],['Can you use StringBuilder?','How do surrogate pairs change char-based reversal?'],'Beginner');
add('S02','Strings','Check a palindrome','Two pointers','String s','boolean',`if (s == null) throw new IllegalArgumentException("null");
int left = 0, right = s.length() - 1;
while (left < right) {
    if (s.charAt(left) != s.charAt(right)) return false;
    left++; right--;
}
return true;`,['racecar','java',''],s=>snap(s,e=>{let l=0,r=s.length-1;while(l<r){e('if (s.charAt','Compare the mirrored characters.',{left:l,right:r,equal:s[l]===s[r]},s.split(''),[l,r],[],{left:l,right:r});if(s[l]!==s[r])return false;l++;r--;}return true;}),'O(n)','O(1)','A palindrome has equal characters at every mirrored pair. Stop at the first mismatch.',['Empty → true','"Aa" → false (case sensitive)','Spaces count as characters'],['Ignore punctuation and case?','Can you avoid allocating a reversed string?'],'Beginner');
add('S03','Strings','Count vowels','Linear scan','String s','int',`if (s == null) throw new IllegalArgumentException("null");
int count = 0;
for (int i = 0; i < s.length(); i++) {
    char c = Character.toLowerCase(s.charAt(i));
    if ("aeiou".indexOf(c) >= 0) count++;
}
return count;`,['Automation','rhythm',''],s=>snap(s,e=>{let count=0;[...s].forEach((c,i)=>{if('aeiou'.includes(c.toLowerCase()))count++;e('if ("aeiou"','Check membership in the five English vowels.',{i,c,count},[...s],[i]);});return count;}),'O(n)','O(1)','Keep a counter and increment only for a, e, i, o, u, ignoring case.',['Empty → 0','Uppercase vowels count','y and accented vowels do not count'],['Count consonants too?','Return each vowel frequency?'],'Beginner');
const freqBody=`if (s == null) throw new IllegalArgumentException("null");
Map<Character, Integer> counts = new LinkedHashMap<>();
for (char c : s.toCharArray()) {
    counts.put(c, counts.getOrDefault(c, 0) + 1);
}
return counts;`;
add('S04','Maps & Sets','Character frequency','Frequency map','String s','Map<Character, Integer>',freqBody,['automation','aab c',''],s=>snap(s,e=>Object.fromEntries(freq(s,e))),'O(n) expected','O(k)','A character is the key and its occurrence count is the value. LinkedHashMap preserves first-seen order.',['Empty → {}','"Aa" has two keys','Whitespace is counted'],['Why LinkedHashMap instead of HashMap?','What changes for Unicode code points?']);
add('S05','Strings','Find duplicate characters','Frequency map','String s','String',freqBody.replace('return counts;',`StringBuilder out = new StringBuilder();
for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
    if (entry.getValue() > 1) out.append(entry.getKey());
}
return out.toString();`),['automation','aabbcc','abc'],s=>snap(s,e=>{let m=freq(s,e),out='';for(let [c,n]of m){if(n>1)out+=c;e('if (entry.getValue','Keep each repeated character once in encounter order.',{c,count:n,out},[...s],[],[...m]);}return out;}),'O(n) expected','O(k)','Count first; keep keys whose count exceeds one.',['No repeats → ""','"aaaa" → "a"','Case-sensitive duplicates'],['Find the first duplicate while scanning?','Return counts alongside characters?']);
add('S06','Strings','First non-repeating character','Two-pass frequency map','String s','String',freqBody.replace('return counts;',`for (char c : s.toCharArray()) {
    if (counts.get(c) == 1) return String.valueOf(c);
}
return "";`),['swiss','aabb','automation'],s=>snap(s,e=>{let m=freq(s,e);for(let i=0;i<s.length;i++){e('if (counts.get','Second pass: select the first character with count one.',{pass:2,i,c:s[i],count:m.get(s[i])},[...s],[i],[...m]);if(m.get(s[i])===1)return s[i];}return '';}),'O(n) expected','O(k)','The first pass establishes global counts. The second preserves the original order when selecting a unique character.',['Empty → ""','All repeated → ""','"aAb" → "a"'],['Can LinkedHashMap remove the second string pass?','What if input arrives as a stream?']);
add('S07','Strings','Check anagrams','Sort and compare','String[] words','boolean',`if (words == null || words.length != 2 || words[0] == null || words[1] == null) throw new IllegalArgumentException("two words required");
char[] a = words[0].toCharArray(), b = words[1].toCharArray();
Arrays.sort(a);
Arrays.sort(b);
return Arrays.equals(a, b);`,[['listen','silent'],['aab','abb'],['','']],v=>snap(v,e=>{let a=[...v[0]].sort(),b=[...v[1]].sort();e('Arrays.sort(a)','Sort the first word.',{word:1},a);e('Arrays.sort(b)','Sort the second word.',{word:2},b);return a.join('')===b.join('');}),'O(n log n + m log m)','O(n + m)','Anagrams have identical sorted character sequences. This contract is case sensitive and includes spaces.',['Both empty → true','Unequal lengths → false','Repeated counts must match'],['Use a frequency map for expected O(n + m)?','How would normalization change the contract?']);
add('S08','Strings','Reverse each word','Token transformation','String s','String',`if (s == null) throw new IllegalArgumentException("null");
String[] words = s.split(" ", -1);
for (int i = 0; i < words.length; i++) {
    words[i] = new StringBuilder(words[i]).reverse().toString();
}
return String.join(" ", words);`,['hello world','a  bc',''],s=>snap(s,e=>{let a=s.split(' ');for(let i=0;i<a.length;i++){a[i]=[...a[i]].reverse().join('');e('words[i] =','Reverse this space-delimited token; preserve all literal spaces.',{i},a,[i]);}return a.join(' ');}),'O(n)','O(n)','Split with a negative limit to retain empty tokens. Reverse tokens and join with literal spaces. Tabs belong to a token.',['Consecutive spaces preserved','Leading/trailing spaces preserved','Empty → ""'],['Reverse word order instead?','Support all whitespace while preserving delimiters?']);
add('S09','Strings','Compress consecutive characters','Run-length encoding','String s','String',`if (s == null) throw new IllegalArgumentException("null");
StringBuilder out = new StringBuilder();
for (int i = 0; i < s.length();) {
    char c = s.charAt(i);
    int j = i + 1;
    while (j < s.length() && s.charAt(j) == c) j++;
    out.append(c).append(j - i);
    i = j;
}
return out.toString();`,['aaabbc','abc',''],s=>snap(s,e=>{let out='';for(let i=0;i<s.length;){let j=i+1;while(j<s.length&&s[j]===s[i])j++;out+=s[i]+(j-i);e('out.append','Append the character and this run length.',{i,j,count:j-i,out},[...s],Array.from({length:j-i},(_,k)=>i+k));i=j;}return out;}),'O(n)','O(n)','Count a consecutive run, emit its character and length, then start at the next run.',['Empty → ""','"abc" → "a1b1c1"','Separated repeats stay separate'],['Keep original if compression is longer?','How would you decode digit characters?']);
add('S10','Maps & Sets','Word frequency','Tokenization and map','String s','Map<String, Integer>',`if (s == null) throw new IllegalArgumentException("null");
Map<String, Integer> counts = new LinkedHashMap<>();
if (s.trim().isEmpty()) return counts;
for (String word : s.toLowerCase(Locale.ROOT).trim().split("\\\\s+")) {
    counts.put(word, counts.getOrDefault(word, 0) + 1);
}
return counts;`,['Test test API','  pass   fail pass  ',''],s=>snap(s,e=>{let m=new Map(),a=s.trim()?s.toLowerCase().trim().split(/\s+/):[];a.forEach((word,i)=>{m.set(word,(m.get(word)||0)+1);e('counts.put','Normalize case and count a whitespace-delimited word.',{i,word},a,[i],[...m]);});return Object.fromEntries(m);}),'O(n) expected','O(n)','Normalize case with Locale.ROOT and split on whitespace; punctuation remains part of the token.',['Whitespace only → {}','Punctuation remains significant','Case folds to lowercase'],['Strip punctuation safely?','Find the most common word?']);
add('A01','Arrays','Reverse an array','Two pointers','int[] a','int[]',`if (a == null) throw new IllegalArgumentException("null");
int left = 0, right = a.length - 1;
while (left < right) {
    int temp = a[left];
    a[left] = a[right];
    a[right] = temp;
    left++; right--;
}
return a;`,[[10,20,30,40,50],[],[7,7]],v=>snap(v,e=>{let a=[...v],l=0,r=a.length-1;while(l<r){let t=a[l];e('int temp','Save the left value.',{left:l,right:r,temp:t},a,[l,r],[],{left:l,right:r});a[l]=a[r];e('a[left] =','Write the right value into the left cell.',{temp:t,left:l,right:r},a,[l,r]);a[r]=t;e('a[right] =','Write the saved value into the right cell.',{temp:t,left:l,right:r},a,[l,r]);l++;r--;e('left++;','Advance pointers; stop when left is no longer less than right.',{left:l,right:r},a,[],[],{left:l,right:r});}return a;}),'O(n)','O(1) auxiliary','Swap mirrored elements in place. After each swap the outer region is in its final position.',['Empty → []','Single value unchanged','Duplicates and negatives supported'],['Return a copy instead?','What is the loop invariant?'],'Beginner');
add('A02','Arrays','Find minimum and maximum','Running extrema','int[] a','int[]',`if (a == null || a.length == 0) throw new IllegalArgumentException("nonempty array required");
int min = a[0], max = a[0];
for (int value : a) {
    min = Math.min(min, value);
    max = Math.max(max, value);
}
return new int[]{min, max};`,[[8,-2,4,10],[7],[-5,-9]],a=>snap(a,e=>{if(!a.length)throw Error('Nonempty array required');let min=a[0],max=a[0];a.forEach((value,i)=>{min=Math.min(min,value);max=Math.max(max,value);e('max = Math.max','Update both running extrema.',{i,value,min,max},a,[i]);});return [min,max];}),'O(n)','O(1)','Initialize from the first element so all-negative arrays work.',['Empty → exception','Single x → [x,x]','All negative values supported'],['Why not initialize maximum to zero?','Can Streams do this without two full scans?'],'Beginner');
add('A03','Arrays','Second-largest distinct value','Running top two','int[] a','Integer',`if (a == null) throw new IllegalArgumentException("null");
Integer first = null, second = null;
for (int value : a) {
    if (first == null || value > first) {
        second = first; first = value;
    } else if (value < first && (second == null || value > second)) {
        second = value;
    }
}
return second;`,[[5,9,9,7],[3,3],[-2147483648,0]],a=>snap(a,e=>{let first=null,second=null;a.forEach((value,i)=>{if(first===null||value>first){second=first;first=value;}else if(value<first&&(second===null||value>second))second=value;e('if (first ==','Maintain the two largest distinct values; duplicates do not displace second.',{i,value,first,second},a,[i]);});return second;}),'O(n)','O(1)','When a new maximum appears, move the old maximum to second. Otherwise improve second only with a distinct smaller value.',['Fewer than two distinct values → null','Integer.MIN_VALUE is valid','Negative arrays supported'],['Why can a sentinel value be unsafe?','Find kth largest distinct?']);
add('A04','Maps & Sets','Find duplicate array values','Seen set','int[] a','Set<Integer>',`if (a == null) throw new IllegalArgumentException("null");
Set<Integer> seen = new HashSet<>();
Set<Integer> duplicates = new LinkedHashSet<>();
for (int value : a) {
    if (!seen.add(value)) duplicates.add(value);
}
return duplicates;`,[[2,1,2,3,1],[7,7,7],[]],a=>snap(a,e=>{let seen=new Set(),out=new Set();a.forEach((value,i)=>{if(seen.has(value))out.add(value);seen.add(value);e('if (!seen.add','A failed insertion means this value appeared before.',{i,value,duplicates:[...out].join(',')},a,[i],[...seen].map(x=>[x,'seen']));});return [...out];}),'O(n) expected','O(k)','HashSet.add returns false for an existing value. A second set ensures each duplicate is emitted once.',['Empty → []','All equal → one duplicate','Negative values supported'],['Preserve first occurrence order instead?','Can sorting save set space?']);
add('A05','Arrays','Find a missing number','XOR cancellation','int[] a','int',`if (a == null) throw new IllegalArgumentException("null");
int missing = a.length;
for (int i = 0; i < a.length; i++) {
    missing ^= i ^ a[i];
}
return missing;`,[[3,0,1],[],[0,1,2]],a=>snap(a,e=>{let missing=a.length;a.forEach((v,i)=>{missing^=i^v;e('missing ^=','Equal values cancel under XOR.',{i,value:v,missing},a,[i]);});return missing;}),'O(n)','O(1)','For n items containing distinct values from 0 through n with exactly one missing, XOR all indices, values, and n.',['Empty → 0','Missing n is supported','Duplicates/out-of-range violate precondition'],['How would you validate the precondition?','Why does XOR avoid sum overflow?']);
add('A06','Arrays','Two Sum','Complement map','int[] a, int target','int[]',`if (a == null) throw new IllegalArgumentException("null");
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < a.length; i++) {
    long complement = (long) target - a[i];
    if (complement >= Integer.MIN_VALUE && complement <= Integer.MAX_VALUE && seen.containsKey((int) complement)) {
        return new int[]{seen.get((int) complement), i};
    }
    seen.put(a[i], i);
}
return new int[0];`,[{a:[2,7,11,15],target:9},{a:[3,3],target:6},{a:[1,2],target:8}],v=>snap(v,e=>{let m=new Map();for(let i=0;i<v.a.length;i++){let complement=v.target-v.a[i];e('long complement','Look for a previously seen complement before inserting this value.',{i,value:v.a[i],target:v.target,complement},v.a,[i],[...m]);if(m.has(complement)){e('return new int','A stored complement plus the current value equals target.',{first:m.get(complement),second:i},v.a,[m.get(complement),i],[...m]);return [m.get(complement),i];}m.set(v.a[i],i);e('seen.put','Store this number and its index for later iterations.',{i},v.a,[i],[...m]);}return [];}),'O(n) expected','O(n)','Store previous values and their indices. Check before inserting to prevent reusing the same index. Long subtraction prevents overflow.',['No pair → []','[3,3], target 6 → [0,1]','Multiple pairs: first found by scan'],['Explain the O(n²) nested-loop approach.','Why check before inserting?']);
add('A07','Arrays','Move zeros to the end','Write pointer','int[] a','int[]',`if (a == null) throw new IllegalArgumentException("null");
int write = 0;
for (int read = 0; read < a.length; read++) {
    if (a[read] != 0) a[write++] = a[read];
}
while (write < a.length) a[write++] = 0;
return a;`,[[0,1,0,3,12],[0,0],[]],v=>snap(v,e=>{let a=[...v],write=0;for(let read=0;read<a.length;read++){if(a[read]!==0)a[write++]=a[read];e('if (a[read]','Copy nonzero values to the next write position; preserve their order.',{read,write},a,[read],[],{read,write});}while(write<a.length){a[write++]=0;e('while (write','Fill the remaining suffix with zeros.',{write},a,[write-1]);}return a;}),'O(n)','O(1)','Compact nonzero values into a prefix and overwrite the rest with zero.',['All zeros unchanged','No zeros unchanged','Relative nonzero order preserved'],['Could swaps perform unnecessary writes?','Move a different sentinel value?']);
add('A08','Arrays','Rotate an array right','Index mapping','int[] a, int k','int[]',`if (a == null) throw new IllegalArgumentException("null");
if (a.length == 0) return a;
int shift = Math.floorMod(k, a.length);
int[] out = new int[a.length];
for (int i = 0; i < a.length; i++) {
    out[(i + shift) % a.length] = a[i];
}
return out;`,[{a:[1,2,3,4,5],k:2},{a:[],k:3},{a:[1,2,3],k:-1}],v=>snap(v,e=>{if(!v.a.length)return [];let shift=((v.k%v.a.length)+v.a.length)%v.a.length,out=Array(v.a.length).fill('·');v.a.forEach((value,i)=>{let dest=(i+shift)%v.a.length;out[dest]=value;e('out[(i + shift)','Map each original index into its rotated destination.',{i,shift,destination:dest},out,[dest]);});return out;}),'O(n)','O(n)','Normalize k with floorMod, then place each value at (i + shift) modulo length. Negative k rotates left.',['Empty → []','k larger than length normalized','Negative k supported'],['Use three reversals for O(1) space?','What does Java % do with negatives?']);
add('A09','Arrays','Distinct array intersection','Set membership','int[] a, int[] b','Set<Integer>',`if (a == null || b == null) throw new IllegalArgumentException("null");
Set<Integer> left = new HashSet<>();
for (int x : a) left.add(x);
Set<Integer> out = new LinkedHashSet<>();
for (int x : b) {
    if (left.contains(x)) out.add(x);
}
return out;`,[{a:[1,2,2,3],b:[2,2,4,1]},{a:[],b:[1]},{a:[-1],b:[-1]}],v=>snap(v,e=>{let left=new Set(v.a),out=new Set();v.b.forEach((x,i)=>{if(left.has(x))out.add(x);e('if (left.contains','Keep values found in both arrays, once, in second-array encounter order.',{x,i,result:[...out].join(',')},v.b,[i],[...left].map(x=>[x,'left']));});return [...out];}),'O(n + m) expected','O(n + m)','Use a membership set for the first array and a result set to remove repeated matches.',['Disjoint → []','Empty side → []','Repeated matches returned once'],['Multiset intersection instead?','What if both arrays are sorted?']);
add('A10','Arrays','Merge sorted arrays','Two pointers','int[] a, int[] b','int[]',`if (a == null || b == null) throw new IllegalArgumentException("null");
int[] out = new int[a.length + b.length];
int i = 0, j = 0, k = 0;
while (i < a.length && j < b.length) {
    out[k++] = a[i] <= b[j] ? a[i++] : b[j++];
}
while (i < a.length) out[k++] = a[i++];
while (j < b.length) out[k++] = b[j++];
return out;`,[{a:[1,3,5],b:[2,4,6]},{a:[],b:[1,2]},{a:[1,1],b:[1]}],v=>snap(v,e=>{let out=[],i=0,j=0;while(i<v.a.length&&j<v.b.length){out.push(v.a[i]<=v.b[j]?v.a[i++]:v.b[j++]);e('out[k++] =','Take the smaller front value; both inputs must already be ascending.',{i,j,k:out.length},out,[out.length-1]);}while(i<v.a.length){out.push(v.a[i++]);e('while (i < a.length) out','Copy the remaining left suffix.',{i,j},out,[out.length-1]);}while(j<v.b.length){out.push(v.b[j++]);e('while (j < b.length) out','Copy the remaining right suffix.',{i,j},out,[out.length-1]);}return out;}),'O(n + m)','O(n + m)','Each pointer visits its array once. The smaller available head is always the next global minimum.',['Empty arrays supported','Duplicates retained','Unsorted inputs violate precondition'],['Merge into spare capacity in the first array?','Why is this better than concatenating and sorting?']);
add('A11','Bonus DSA','Binary search','Halve the search range','int[] a, int target','int',`if (a == null) throw new IllegalArgumentException("null");
int left = 0, right = a.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (a[mid] == target) return mid;
    if (a[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;`,[{a:[1,3,5,7,9],target:7},{a:[],target:1},{a:[2,2],target:2}],v=>snap(v,e=>{let l=0,r=v.a.length-1;while(l<=r){let mid=l+Math.floor((r-l)/2);e('int mid','Inspect the middle of the current inclusive range.',{left:l,right:r,mid,target:v.target},v.a,[mid],[],{left:l,mid,right:r});if(v.a[mid]===v.target)return mid;if(v.a[mid]<v.target)l=mid+1;else r=mid-1;e('if (a[mid] <','Discard the half that cannot contain target.',{left:l,right:r},v.a,[],[],{left:l,right:r});}return -1;}),'O(log n)','O(1)','On sorted ascending input, comparison with the middle value eliminates half the remaining range.',['Empty → -1','Absent target → -1','Duplicates: any matching index'],['Find the first occurrence?','Why left <= right rather than left < right?']);
add('A12','Arrays','Bubble sort','Adjacent swaps','int[] a','int[]',`if (a == null) throw new IllegalArgumentException("null");
for (int end = a.length - 1; end > 0; end--) {
    boolean swapped = false;
    for (int j = 0; j < end; j++) {
        if (a[j] > a[j + 1]) {
            int temp = a[j]; a[j] = a[j + 1]; a[j + 1] = temp;
            swapped = true;
        }
    }
    if (!swapped) break;
}
return a;`,[[5,1,4,2],[1,2,3],[]],v=>snap(v,e=>{let a=[...v];for(let end=a.length-1;end>0;end--){let swapped=false;for(let j=0;j<end;j++){if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];swapped=true;}e('if (a[j] >','Compare adjacent values; move the larger one toward the end.',{end,j,swapped},a,[j,j+1]);}if(!swapped)break;}return a;}),'O(n²) worst; O(n) best','O(1)','A pass bubbles the largest unsorted value to the end. Stop early if a pass makes no swaps.',['Empty stays empty','Already sorted stops early','Equal elements retain order'],['Why use Arrays.sort in production?','Explain stability.']);
add('M01','Maps & Sets','Remove duplicates, preserve order','LinkedHashSet','List<Integer> values','List<Integer>',`if (values == null) throw new IllegalArgumentException("null");
Set<Integer> unique = new LinkedHashSet<>();
for (Integer value : values) {
    unique.add(value);
}
return new ArrayList<>(unique);`,[[3,1,3,2,1],[],[4,4]],a=>snap(a,e=>{let unique=new Set();a.forEach((value,i)=>{unique.add(value);e('unique.add','Insert once while retaining first-seen order.',{i,value},a,[i],[...unique].map(x=>[x,'present']));});return [...unique];}),'O(n) expected','O(k)','LinkedHashSet combines uniqueness and insertion order. Convert to ArrayList when the caller needs a list.',['Empty → []','All duplicates → one item','Null elements supported in Java list'],['How does TreeSet change the result?','What are equals/hashCode requirements?']);
add('M02','Maps & Sets','First unique array element','Two-pass frequency map','int[] a','Integer',`if (a == null) throw new IllegalArgumentException("null");
Map<Integer, Integer> counts = new LinkedHashMap<>();
for (int x : a) counts.put(x, counts.getOrDefault(x, 0) + 1);
for (int x : a) {
    if (counts.get(x) == 1) return x;
}
return null;`,[[4,5,4,6,5],[1,1],[]],a=>snap(a,e=>{let m=new Map();a.forEach((x,i)=>{m.set(x,(m.get(x)||0)+1);e('counts.put','Build global occurrence counts.',{i,x,pass:1},a,[i],[...m]);});for(let i=0;i<a.length;i++){e('if (counts.get','Second pass selects the earliest unique value.',{i,x:a[i],pass:2},a,[i],[...m]);if(m.get(a[i])===1)return a[i];}return null;}),'O(n) expected','O(k)','Count all values before deciding which occurrence is globally unique.',['No unique → null','Empty → null','Negative values supported'],['Return an index instead?','Can you reuse this for response IDs?']);
add('M03','Maps & Sets','Sort a map by keys','TreeMap ordering','Map<String, Integer> values','Map<String, Integer>',`if (values == null) throw new IllegalArgumentException("null");
Map<String, Integer> sorted = new TreeMap<>();
for (Map.Entry<String, Integer> entry : values.entrySet()) {
    sorted.put(entry.getKey(), entry.getValue());
}
return sorted;`,[{z:3,a:1,m:2},{},{b:4,a:4}],v=>snap(v,e=>{let m={};for(let [key,value]of Object.entries(v)){m[key]=value;e('sorted.put','Insert into a naturally ordered tree map.',{key,value},[],[],Object.entries(m).sort(([a],[b])=>a<b?-1:a>b?1:0));}return Object.fromEntries(Object.entries(m).sort(([a],[b])=>a<b?-1:a>b?1:0));}),'O(k log k)','O(k)','TreeMap orders non-null string keys lexicographically, independent of insertion order.',['Empty → {}','Null keys rejected','Equal values do not collapse keys'],['Sort by descending key?','How does TreeMap compare with LinkedHashMap?']);
add('C01','Collections','Sort test names by length','Comparator chaining','List<String> names','List<String>',`if (names == null) throw new IllegalArgumentException("null");
List<String> out = new ArrayList<>(names);
out.sort(Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));
return out;`,[['login','api','checkout','aaa'],[],['b','a']],a=>snap(a,e=>{let out=[...a].sort((a,b)=>a.length-b.length||(a<b?-1:a>b?1:0));e('out.sort','Sort by length, then natural order to resolve ties.',{rule:'length → name'},out);return out;}),'O(n log n) worst comparisons','O(n)','Copy the list before sorting. Chain a secondary comparator for deterministic ties. String comparisons add a length-dependent cost.',['Empty → []','Ties sorted alphabetically','Null elements violate precondition'],['Sort custom objects by duration and name?','Why avoid subtraction in an integer comparator?']);
add('C02','Collections','Safely remove blank test names','Iterator removal','List<String> names','List<String>',`if (names == null) throw new IllegalArgumentException("null");
List<String> out = new ArrayList<>(names);
Iterator<String> iterator = out.iterator();
while (iterator.hasNext()) {
    String name = iterator.next();
    if (name == null || name.trim().isEmpty()) iterator.remove();
}
return out;`,[['login',' ','','api'],[null,'test'],[]],a=>snap(a,e=>{let out=[];a.forEach((name,i)=>{let remove=name===null||!name.trim();if(!remove)out.push(name);e('if (name ==','Iterator.remove removes the current blank entry safely.',{i,name,remove},a,[i],out.map((v,j)=>[j,v]));});return out;}),'O(n² + total characters) worst on ArrayList','O(n)','Use the iterator that owns the traversal to remove entries; avoid modifying the list through a separate enhanced-for loop.',['Null element removed','Whitespace-only removed','Empty list stays empty'],['Use removeIf in Java 8?','Why can enhanced-for removal throw ConcurrentModificationException?']);
add('T01','Streams','Filter failed test cases','Stream filter','List<String> results','List<String>',`if (results == null) throw new IllegalArgumentException("null");
return results.stream()
    .filter("FAIL"::equals)
    .collect(Collectors.toList());`,[['PASS','FAIL','SKIP','FAIL'],[null,'FAIL'],[]],a=>snap(a,e=>{let out=[];a.forEach((status,i)=>{if(status==='FAIL')out.push(status);e('.filter','The null-safe predicate keeps only exact FAIL statuses.',{i,status,accepted:status==='FAIL'},a,[i],out.map((v,j)=>[j,v]));});return out;}),'O(n)','O(f) result','A stream filter retains matching entries in encounter order. Constant-first equals tolerates null entries.',['Null statuses are ignored','Case-sensitive: fail is ignored','No failures → []'],['Filter custom TestResult objects?','What happens if you use results.toList on Java 8?'],'Easy','Use this to select failures for a rerun list or failure report. Java 8 uses Collectors.toList(); Stream.toList() requires Java 16+.');
add('T02','Streams','Group results by status','Grouping collector','List<String> results','Map<String, Long>',`if (results == null) throw new IllegalArgumentException("null");
return results.stream()
    .filter(Objects::nonNull)
    .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()));`,[['PASS','FAIL','PASS','SKIP'],[],['FAIL',null,'FAIL']],a=>snap(a,e=>{let m=new Map();a.forEach((status,i)=>{if(status!==null)m.set(status,(m.get(status)||0)+1);e('.collect','Each non-null result contributes one to its status group.',{i,status},a,[i],[...m]);});return Object.fromEntries(m);}),'O(n) expected','O(k)','groupingBy chooses a key and counting accumulates the number of entries per key. Null statuses are excluded.',['Empty → {}','Null excluded','Unknown statuses are retained as their own group'],['Restrict keys to PASS/FAIL/SKIP?','Return grouped result objects instead of counts?'],'Easy','Build execution-summary counts for reports. Unknown statuses remain visible rather than being silently converted to PASS.');
add('T03','Streams','Map names to uppercase','Stream map','List<String> names','List<String>',`if (names == null) throw new IllegalArgumentException("null");
return names.stream()
    .filter(Objects::nonNull)
    .map(name -> name.toUpperCase(Locale.ROOT))
    .collect(Collectors.toList());`,[['login','api'],[null,'test'],[]],a=>snap(a,e=>{let out=[];a.forEach((name,i)=>{if(name!==null)out.push(name.toUpperCase());e('.map(name','Transform each non-null name with locale-independent uppercase.',{i,name},a,[i],out.map((v,j)=>[j,v]));});return out;}),'O(total characters + n)','O(output characters + n)','Filter removes nulls; map transforms values without changing their encounter order.',['Nulls omitted','Empty string preserved','Locale.ROOT prevents machine-locale differences'],['Difference between map and filter?','When would flatMap be appropriate?']);
add('N01','Number Logic','Check a prime number','Trial division','int n','boolean',`if (n < 2) return false;
for (int divisor = 2; divisor <= n / divisor; divisor++) {
    if (n % divisor == 0) return false;
}
return true;`,[29,12,1],n=>snap(n,e=>{if(n<2)return false;for(let divisor=2;divisor<=Math.floor(n/divisor);divisor++){e('if (n %','A zero remainder establishes a factor.',{n,divisor,remainder:n%divisor},Array.from({length:Math.min(15,Math.floor(Math.sqrt(n))-1)},(_,i)=>i+2),[divisor-2]);if(n%divisor===0)return false;}return true;}),'O(√n)','O(1)','A composite number has a factor no greater than its square root. Use n/divisor to avoid multiplication overflow.',['Negative and 0,1 → false','2 → true','Perfect squares must test the square root'],['Why not test until n - 1?','How would you generate many primes?'],'Beginner');
add('N02','Number Logic','Generate Fibonacci numbers','Iterative state','int n','List<Long>',`if (n < 0 || n > 93) throw new IllegalArgumentException("n must be 0..93");
List<Long> out = new ArrayList<>();
for (int i = 0; i < n; i++) {
    long value = i < 2 ? i : out.get(i - 1) + out.get(i - 2);
    out.add(value);
}
return out;`,[7,0,1],n=>snap(n,e=>{if(n<0||n>93)throw Error('n must be 0..93');let out=[];for(let i=0;i<n;i++){let value=i<2?BigInt(i):BigInt(out[i-1])+BigInt(out[i-2]);out.push(value.toString());e('out.add','Append the next Fibonacci value, computed from the preceding two.',{i,value:value.toString()},out,[i]);}return out;}),'O(n)','O(n) output; O(1) state','Append the sum of the previous two terms, starting 0 and 1. At most 93 terms (F0 through F92) fit signed long.',['n=0 → []','n=1 → [0]','Outside 0..93 → exception'],['Why is naive recursion expensive?','How would BigInteger remove the bound?'],'Beginner');
add('N03','Number Logic','Calculate factorial','Accumulator','int n','long',`if (n < 0 || n > 20) throw new IllegalArgumentException("n must be 0..20");
long result = 1;
for (int i = 2; i <= n; i++) {
    result *= i;
}
return result;`,[5,0,20],n=>snap(n,e=>{if(n<0||n>20)throw Error('n must be 0..20');let result=1n;for(let i=2;i<=n;i++){result*=BigInt(i);e('result *=','Multiply the accumulated product by i.',{i,result:result.toString()},[]);}return result.toString();}),'O(n)','O(1)','Initialize to the empty product 1, so 0! is correct. Signed long supports up to 20!.',['0! = 1','Negative → exception','21 → exception to prevent overflow'],['Use Math.multiplyExact?','When would BigInteger be necessary?'],'Beginner');
add('N04','Number Logic','FizzBuzz','Ordered conditions','int n','List<String>',`if (n < 0 || n > 1000) throw new IllegalArgumentException("n must be 0..1000");
List<String> out = new ArrayList<>();
for (int i = 1; i <= n; i++) {
    out.add(i % 15 == 0 ? "FizzBuzz" : i % 3 == 0 ? "Fizz" : i % 5 == 0 ? "Buzz" : String.valueOf(i));
}
return out;`,[15,0,5],n=>snap(n,e=>{if(n<0||n>1000)throw Error('n must be 0..1000');let out=[];for(let i=1;i<=n;i++){let value=i%15===0?'FizzBuzz':i%3===0?'Fizz':i%5===0?'Buzz':String(i);out.push(value);e('out.add','Test divisibility by both first, then individual divisibility.',{i,value},out,[i-1]);}return out;}),'O(n)','O(n) output','The combined condition must precede the individual conditions or multiples of 15 will be misclassified.',['0 → []','15 → FizzBuzz at last position','Negative → exception'],['Write using if/else instead?','What tests cover all four branches?'],'Beginner');
add('N05','Number Logic','Sum of digits','Modulo and division','int n','int',`long remaining = Math.abs((long) n);
int sum = 0;
while (remaining > 0) {
    sum += remaining % 10;
    remaining /= 10;
}
return sum;`,[1234,-905,0],n=>snap(n,e=>{let remaining=Math.abs(n),sum=0;while(remaining>0){let digit=remaining%10;sum+=digit;remaining=Math.floor(remaining/10);e('remaining /=','Extract the last digit with %, then remove it with integer division.',{digit,remaining,sum},[]);}return sum;}),'O(d) for d digits','O(1)','Promote to long before abs to handle Integer.MIN_VALUE safely.',['0 → 0','Negative sign ignored','MIN_VALUE → 47'],['Compute digital root?','Why does Math.abs(Integer.MIN_VALUE) fail?'],'Beginner');
add('N06','Number Logic','Numerical palindrome','Digit reversal','int n','boolean',`if (n < 0) return false;
long reversed = 0;
int remaining = n;
while (remaining > 0) {
    reversed = reversed * 10 + remaining % 10;
    remaining /= 10;
}
return reversed == n;`,[121,10,-121],n=>snap(n,e=>{if(n<0)return false;let reversed=0,remaining=n;while(remaining>0){reversed=reversed*10+remaining%10;remaining=Math.floor(remaining/10);e('remaining /=','Move one last digit into the reversed number.',{remaining,reversed,n},[]);}return reversed===n;}),'O(d) for d digits','O(1)','Reverse the positive integer into a long and compare with the original.',['0 → true','Negative → false','Trailing zero except 0 → false'],['Reverse only half the digits?','Why use long for the reversal?']);
add('Q01','QA Coding','Duplicate Selenium dropdown labels','Set membership','List<String> labels','Set<String>',`if (labels == null) throw new IllegalArgumentException("null");
Set<String> seen = new HashSet<>();
Set<String> duplicates = new LinkedHashSet<>();
for (String label : labels) {
    if (!seen.add(label)) duplicates.add(label);
}
return duplicates;`,[['India','US','India','UK','US'],[],['','']],a=>snap(a,e=>{let seen=new Set(),out=new Set();a.forEach((label,i)=>{if(seen.has(label))out.add(label);seen.add(label);e('if (!seen.add','Flag a label encountered previously.',{i,label,duplicates:[...out].join(',')},a,[i],[...seen].map(x=>[x,'seen']));});return [...out];}),'O(n) expected','O(k)','Count a repeated visible label once. This task compares exact labels, including whitespace and case.',['Empty dropdown → []','Whitespace differences remain distinct','Null labels treated as a value'],['Normalize labels before comparing?','Should option value or visible text be unique?'],'Easy','In Selenium, collect labels with new Select(element).getOptions(), then map WebElement::getText into this pure Java method. Keep browser access outside the algorithm.');
add('Q02','QA Coding','Count HTTP response statuses','Frequency map','int[] codes','Map<Integer, Integer>',`if (codes == null) throw new IllegalArgumentException("null");
Map<Integer, Integer> counts = new LinkedHashMap<>();
for (int code : codes) {
    counts.put(code, counts.getOrDefault(code, 0) + 1);
}
return counts;`,[[200,500,200,404,500],[],[201,204]],a=>snap(a,e=>{let m=new Map();a.forEach((code,i)=>{m.set(code,(m.get(code)||0)+1);e('counts.put','Count each observed status without dropping unusual codes.',{i,code},a,[i],[...m]);});return Object.fromEntries(m);}),'O(n) expected','O(k)','Use a status code as the key and number of observations as the count.',['Empty → {}','Unknown codes remain visible','Each exact status is separate'],['Aggregate into 2xx/4xx/5xx families?','Which failures require assertions?'],'Easy','Summarize status codes collected from Rest Assured response.statusCode() calls to reveal unexpected API failures.');
add('Q03','QA Coding','Count ERROR entries in logs','Token parsing','List<String> lines','int',`if (lines == null) throw new IllegalArgumentException("null");
int count = 0;
for (String line : lines) {
    if (line == null) continue;
    String[] tokens = line.trim().split("\\\\s+", 2);
    if (tokens[0].equals("ERROR")) count++;
}
return count;`,[['INFO started','ERROR timeout','ERROR connection','WARN retry'],['NOERROR text','error lower',null],[]],a=>snap(a,e=>{let count=0;a.forEach((line,i)=>{let level=line===null?'':line.trim().split(/\s+/,2)[0];if(level==='ERROR')count++;e('if (tokens[0]','Only the first whitespace-delimited token identifies the level.',{i,level,count},a,[i]);});return count;}),'O(total characters)','O(longest line)','For this exercise each line starts with a level token. Exact equality avoids counting messages that merely contain ERROR.',['Null lines skipped','"NOERROR" is not ERROR','Lowercase error is not counted'],['What if timestamps precede the level?','Group errors by message signature?'],'Easy','Parse execution logs to count error-level entries. A real log format may put the level in a different field; adapt parsing to that schema.');
add('Q04','QA Coding','Compare expected and actual API maps','Map equality','Map<String, String> expected, Map<String, String> actual','boolean',`if (expected == null || actual == null) throw new IllegalArgumentException("null map");
return expected.equals(actual);`,[{expected:{id:'7',status:'active'},actual:{status:'active',id:'7'}},{expected:{id:'7'},actual:{id:'8'}},{expected:{},actual:{}}],v=>snap(v,e=>{let keys=Object.keys(v.expected);e('return expected.equals','Map equality checks size plus the same key/value mappings; order does not matter.',{expectedSize:keys.length,actualSize:Object.keys(v.actual).length},[],[],[...keys.map(k=>[k,`${JSON.stringify(v.expected[k])} ↔ ${JSON.stringify(v.actual[k])}`])]);return keys.length===Object.keys(v.actual).length&&keys.every(k=>Object.hasOwn(v.actual,k)&&v.expected[k]===v.actual[k]);}),'O(k) expected for hash maps','O(1) auxiliary','Map.equals compares mappings instead of iteration order. This contract uses flat string values, not nested JSON or numeric coercion.',['Both empty → true','Extra key → false','Missing key differs from mapped null'],['Produce a mismatch report?','How would nested arrays change equality?'],'Easy','Compare normalized flat API response fields against expected test data. Exclude volatile fields explicitly before calling the method.');
add('Q05','QA Coding','Detect duplicate API IDs','Uniqueness validation','List<String> ids','Set<String>',`if (ids == null) throw new IllegalArgumentException("null");
Set<String> seen = new HashSet<>();
Set<String> duplicateIds = new LinkedHashSet<>();
for (String id : ids) {
    if (id == null || id.trim().isEmpty()) throw new IllegalArgumentException("invalid ID");
    if (!seen.add(id)) duplicateIds.add(id);
}
return duplicateIds;`,[['u1','u2','u1','u3'],[],['a','a','a']],a=>snap(a,e=>{let seen=new Set(),out=new Set();a.forEach((id,i)=>{if(id===null||!id.trim())throw Error('invalid ID');if(seen.has(id))out.add(id);seen.add(id);e('if (!seen.add','Check uniqueness after validating presence.',{i,id},a,[i],[...seen].map(k=>[k,out.has(k)?'duplicate':'seen']));});return [...out];}),'O(total ID characters) expected','O(k)','Reject blank IDs, then use set insertion to detect duplicates. Comparisons are exact and case sensitive.',['Blank/null ID → exception','Empty batch → []','Repeated ID returned once'],['Are IDs globally unique or per tenant?','How would you report row indices?'],'Easy','Validate identifiers in API fixtures or response records before running assertions that assume one record per ID.');
add('Q06','QA Coding','Validate test-data ID format','Regular expression','String id','boolean',`return id != null && id.matches("TC-[0-9]{4}");`,['TC-0123','TC-12','tc-1234'],id=>snap(id,e=>{let result=id!==null&&/^TC-[0-9]{4}$/.test(id);e('return id !=','Require the entire value to match literal TC- followed by four ASCII digits.',{id,matches:result},id===null?[]:[...id]);return result;}),'O(n) for input length','O(1) for this fixed pattern','String.matches checks the whole string. Use [0-9] to make the ASCII digit requirement explicit.',['Null → false','Exactly four digits required','Spaces and lowercase prefix rejected'],['Precompile Pattern for repeated checks?','Is a format check enough to establish uniqueness?'],'Beginner','Reject malformed test-case IDs in a data provider before execution. This is a deliberately narrow format validator, not a universal ID standard.');
add('B01','Bonus DSA','Balanced brackets','Stack','String s','boolean',`if (s == null) throw new IllegalArgumentException("null");
Deque<Character> stack = new ArrayDeque<>();
for (char c : s.toCharArray()) {
    if (c == '(' || c == '[' || c == '{') stack.push(c);
    else if (c == ')' || c == ']' || c == '}') {
        if (stack.isEmpty()) return false;
        char top = stack.pop();
        if ((c == ')' && top != '(') || (c == ']' && top != '[') || (c == '}' && top != '{')) return false;
    } else throw new IllegalArgumentException("brackets only");
}
return stack.isEmpty();`,['{[()]}','([)]',''],s=>snap(s,e=>{let stack=[],pairs={')':'(',']':'[','}':'{'};for(let i=0;i<s.length;i++){let c=s[i];if('([{'.includes(c)){stack.unshift(c);e('stack.push','Push an opening bracket on top.',{i,c},[...s],[i],stack.map((x,j)=>[j===0?'top':j,x]));}else if(')]}'.includes(c)){if(!stack.length){e('if (stack.isEmpty)','No opening bracket exists for this closing bracket.',{i,c},[...s],[i]);return false;}let top=stack.shift();e('char top =','Pop the most recent unmatched opening bracket.',{i,c,top,matches:top===pairs[c]},[...s],[i],stack.map((x,j)=>[j===0?'top':j,x]));if(top!==pairs[c])return false;}else throw Error('brackets only');}return !stack.length;}),'O(n)','O(n)','The most recent opener must match the next closer; a stack represents that last-in-first-out rule.',['Empty → true','Unclosed opener → false','Non-bracket character → exception'],['Ignore brackets inside quoted strings?','Why use ArrayDeque instead of legacy Stack?'],'Medium');
add('B02','Bonus DSA','Longest substring without repeats','Sliding window','String s','int',`if (s == null) throw new IllegalArgumentException("null");
Map<Character, Integer> last = new HashMap<>();
int left = 0, best = 0;
for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    if (last.containsKey(c)) left = Math.max(left, last.get(c) + 1);
    last.put(c, right);
    best = Math.max(best, right - left + 1);
}
return best;`,['abcabcbb','abba',''],s=>snap(s,e=>{let last=new Map(),left=0,best=0;for(let right=0;right<s.length;right++){let c=s[right];if(last.has(c))left=Math.max(left,last.get(c)+1);last.set(c,right);best=Math.max(best,right-left+1);e('best = Math.max','Move left past a repeated character without ever moving it backward.',{left,right,c,best},[...s],Array.from({length:right-left+1},(_,i)=>left+i),[...last],{left,right});}return best;}),'O(n) expected','O(k)','Maintain a unique-character window. Last-seen positions jump the left edge past duplicates. Each right index is visited once.',['Empty → 0','All identical → 1','"abba" tests left never moving backward'],['Return the substring too?','Why is Math.max necessary when updating left?'],'Medium');
add('M04','Maps & Sets','Sort map entries by count','Entry comparator','Map<String, Integer> counts','Map<String, Integer>',`if (counts == null) throw new IllegalArgumentException("null");
List<Map.Entry<String, Integer>> entries = new ArrayList<>(counts.entrySet());
entries.sort(Map.Entry.<String, Integer>comparingByValue().reversed().thenComparing(Map.Entry.comparingByKey()));
Map<String, Integer> out = new LinkedHashMap<>();
for (Map.Entry<String, Integer> entry : entries) {
    out.put(entry.getKey(), entry.getValue());
}
return out;`,[{api:3,login:5,cart:3},{},{a:0,b:-1}],v=>snap(v,e=>{let entries=Object.entries(v).sort(([a,x],[b,y])=>y-x||(a<b?-1:a>b?1:0));e('entries.sort','Order by descending count, then ascending key.',{rule:'count desc → key asc'},[],[],entries);let out={};for(let [key,value]of entries){out[key]=value;e('out.put','Copy into LinkedHashMap to retain the sorted encounter order.',{key,value},[],[],Object.entries(out));}return out;}),'O(k log k) comparisons','O(k)','Sort entries by value rather than key. Copy to LinkedHashMap so iteration retains the sorted order. Null keys and values are excluded by the contract.',['Empty → {}','Equal counts break ties by key','Negative counts still sort numerically'],['Why does TreeMap not sort by value?','Return just the highest-frequency key?']);
add('C03','Collections','Sort custom test results','Object comparator','List<TestResult> results','List<TestResult>',`if (results == null) throw new IllegalArgumentException("null");
List<TestResult> out = new ArrayList<>(results);
out.sort(Comparator.comparingInt((TestResult r) -> r.durationMs).thenComparing(r -> r.name));
return out;`,[[{name:'login',durationMs:120},{name:'api',durationMs:30},{name:'cart',durationMs:30}],[],[{name:'smoke',durationMs:0}]],a=>snap(a,e=>{let out=[...a].sort((a,b)=>a.durationMs-b.durationMs||(a.name<b.name?-1:a.name>b.name?1:0));e('out.sort','Compare duration first; break ties using the test name.',{rule:'duration → name'},out.map(x=>x.name+':'+x.durationMs));return out;}),'O(n log n) comparisons','O(n)','Copy and sort custom objects with Comparator.comparingInt, then chain a deterministic name tie-breaker. No subtraction means no comparator arithmetic overflow.',['Empty → []','Equal duration sorts by name','Null results or names violate precondition'],['Use descending duration for slow-test reports?','Comparable vs Comparator?'],'Easy','Rank test results by runtime to identify slow tests; use the name tie-breaker for reproducible reports.');
bank[bank.length-1].extra=`    public static class TestResult {
        public final String name;
        public final int durationMs;
        public TestResult(String name, int durationMs) {
            this.name = Objects.requireNonNull(name);
            this.durationMs = durationMs;
        }
        @Override public boolean equals(Object other) {
            if (!(other instanceof TestResult)) return false;
            TestResult r = (TestResult) other;
            return durationMs == r.durationMs && name.equals(r.name);
        }
        @Override public int hashCode() { return Objects.hash(name, durationMs); }
        @Override public String toString() { return name + ":" + durationMs; }
    }`;
export function code(q){return `import java.util.*;\nimport java.util.function.Function;\nimport java.util.stream.Collectors;\n\npublic class Solution {\n    public static ${q.ret} solve(${q.param}) {\n${q.body.split('\n').map(x=>'        '+x).join('\n')}\n    }${q.extra?'\n'+q.extra:''}\n}`;}
export function starter(q){return `import java.util.*;\nimport java.util.function.Function;\nimport java.util.stream.Collectors;\n\npublic class Solution {\n    public static ${q.ret} solve(${q.param}) {\n        // Write your solution here.\n        throw new UnsupportedOperationException("Implement solve");\n    }${q.extra?'\n'+q.extra:''}\n}`;}
export function execute(q,v){return q.run(v);}
