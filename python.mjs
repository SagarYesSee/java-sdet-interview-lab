// Python 3.8+ reference solutions, one per bank question (same IDs and contracts as the Java versions).
// Ordered sets are returned as lists (Python sets have no order); maps are dicts (insertion ordered).
// Multi-argument questions use keyword names that match the sample JSON keys (a, target, k, b, expected, actual).
const P = {};
const add = (id, sig, body) => { P[id] = { sig, body }; };

add('S01', 'def solve(s: str) -> str:', `if s is None:
    raise ValueError("null")
a = list(s)
left, right = 0, len(a) - 1
while left < right:
    a[left], a[right] = a[right], a[left]
    left += 1
    right -= 1
return "".join(a)`);

add('S02', 'def solve(s: str) -> bool:', `if s is None:
    raise ValueError("null")
left, right = 0, len(s) - 1
while left < right:
    if s[left] != s[right]:
        return False
    left += 1
    right -= 1
return True`);

add('S03', 'def solve(s: str) -> int:', `if s is None:
    raise ValueError("null")
count = 0
for c in s:
    if c.lower() in "aeiou":
        count += 1
return count`);

add('S04', 'def solve(s: str) -> dict:', `if s is None:
    raise ValueError("null")
counts = {}  # dicts keep insertion order (Python 3.7+)
for c in s:
    counts[c] = counts.get(c, 0) + 1
return counts`);

add('S05', 'def solve(s: str) -> str:', `if s is None:
    raise ValueError("null")
counts = {}
for c in s:
    counts[c] = counts.get(c, 0) + 1
out = []
for c, n in counts.items():
    if n > 1:
        out.append(c)
return "".join(out)`);

add('S06', 'def solve(s: str) -> str:', `if s is None:
    raise ValueError("null")
counts = {}
for c in s:
    counts[c] = counts.get(c, 0) + 1
for c in s:
    if counts[c] == 1:
        return c
return ""`);

add('S07', 'def solve(words: list) -> bool:', `if words is None or len(words) != 2 or words[0] is None or words[1] is None:
    raise ValueError("two words required")
return sorted(words[0]) == sorted(words[1])`);

add('S08', 'def solve(s: str) -> str:', `if s is None:
    raise ValueError("null")
words = s.split(" ")  # split on a literal space keeps empty tokens
for i in range(len(words)):
    words[i] = words[i][::-1]
return " ".join(words)`);

add('S09', 'def solve(s: str) -> str:', `if s is None:
    raise ValueError("null")
out = []
i = 0
while i < len(s):
    c = s[i]
    j = i + 1
    while j < len(s) and s[j] == c:
        j += 1
    out.append(c + str(j - i))
    i = j
return "".join(out)`);

add('S10', 'def solve(s: str) -> dict:', `if s is None:
    raise ValueError("null")
counts = {}
for word in s.lower().split():  # split() with no argument splits on any whitespace
    counts[word] = counts.get(word, 0) + 1
return counts`);

add('A01', 'def solve(a: list) -> list:', `if a is None:
    raise ValueError("null")
left, right = 0, len(a) - 1
while left < right:
    a[left], a[right] = a[right], a[left]
    left += 1
    right -= 1
return a`);

add('A02', 'def solve(a: list) -> list:', `if not a:
    raise ValueError("nonempty array required")
lo = hi = a[0]
for value in a:
    lo = min(lo, value)
    hi = max(hi, value)
return [lo, hi]`);

add('A03', 'def solve(a: list) -> Optional[int]:', `if a is None:
    raise ValueError("null")
first = second = None
for value in a:
    if first is None or value > first:
        second, first = first, value
    elif value < first and (second is None or value > second):
        second = value
return second`);

add('A04', 'def solve(a: list) -> list:', `if a is None:
    raise ValueError("null")
seen = set()
duplicates = {}  # dict keys act as an insertion-ordered set
for value in a:
    if value in seen:
        duplicates[value] = True
    seen.add(value)
return list(duplicates)`);

add('A05', 'def solve(a: list) -> int:', `if a is None:
    raise ValueError("null")
missing = len(a)
for i, value in enumerate(a):
    missing ^= i ^ value
return missing`);

add('A06', 'def solve(a: list, target: int) -> list:', `if a is None:
    raise ValueError("null")
seen = {}  # value -> index
for i, value in enumerate(a):
    complement = target - value  # Python ints never overflow
    if complement in seen:
        return [seen[complement], i]
    seen[value] = i
return []`);

add('A07', 'def solve(a: list) -> list:', `if a is None:
    raise ValueError("null")
write = 0
for read in range(len(a)):
    if a[read] != 0:
        a[write] = a[read]
        write += 1
while write < len(a):
    a[write] = 0
    write += 1
return a`);

add('A08', 'def solve(a: list, k: int) -> list:', `if a is None:
    raise ValueError("null")
if not a:
    return []
shift = k % len(a)  # Python % is already floor-mod, so negative k works
out = [0] * len(a)
for i, value in enumerate(a):
    out[(i + shift) % len(a)] = value
return out`);

add('A09', 'def solve(a: list, b: list) -> list:', `if a is None or b is None:
    raise ValueError("null")
left = set(a)
out = {}  # insertion-ordered set
for x in b:
    if x in left:
        out[x] = True
return list(out)`);

add('A10', 'def solve(a: list, b: list) -> list:', `if a is None or b is None:
    raise ValueError("null")
out = []
i = j = 0
while i < len(a) and j < len(b):
    if a[i] <= b[j]:
        out.append(a[i])
        i += 1
    else:
        out.append(b[j])
        j += 1
out.extend(a[i:])
out.extend(b[j:])
return out`);

add('A11', 'def solve(a: list, target: int) -> int:', `if a is None:
    raise ValueError("null")
left, right = 0, len(a) - 1
while left <= right:
    mid = (left + right) // 2
    if a[mid] == target:
        return mid
    if a[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
return -1`);

add('A12', 'def solve(a: list) -> list:', `if a is None:
    raise ValueError("null")
for end in range(len(a) - 1, 0, -1):
    swapped = False
    for j in range(end):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
            swapped = True
    if not swapped:
        break
return a`);

add('M01', 'def solve(values: list) -> list:', `if values is None:
    raise ValueError("null")
return list(dict.fromkeys(values))  # keeps the first occurrence of each value`);

add('M02', 'def solve(a: list) -> Optional[int]:', `if a is None:
    raise ValueError("null")
counts = {}
for x in a:
    counts[x] = counts.get(x, 0) + 1
for x in a:
    if counts[x] == 1:
        return x
return None`);

add('M03', 'def solve(values: dict) -> dict:', `if values is None:
    raise ValueError("null")
return {key: values[key] for key in sorted(values)}`);

add('M04', 'def solve(counts: dict) -> dict:', `if counts is None:
    raise ValueError("null")
entries = sorted(counts.items(), key=lambda e: (-e[1], e[0]))  # count desc, then key asc
return dict(entries)`);

add('C01', 'def solve(names: list) -> list:', `if names is None:
    raise ValueError("null")
return sorted(names, key=lambda name: (len(name), name))`);

add('C02', 'def solve(names: list) -> list:', `if names is None:
    raise ValueError("null")
# Build a new list instead of removing items while iterating.
return [name for name in names if name is not None and name.strip() != ""]`);

add('C03', 'def solve(results: list) -> list:', `# Each result is a dict: {"name": str, "durationMs": int}
if results is None:
    raise ValueError("null")
return sorted(results, key=lambda r: (r["durationMs"], r["name"]))`);

add('T01', 'def solve(results: list) -> list:', `if results is None:
    raise ValueError("null")
return [status for status in results if status == "FAIL"]`);

add('T02', 'def solve(results: list) -> dict:', `if results is None:
    raise ValueError("null")
counts = {}
for status in results:
    if status is not None:
        counts[status] = counts.get(status, 0) + 1
return counts`);

add('T03', 'def solve(names: list) -> list:', `if names is None:
    raise ValueError("null")
return [name.upper() for name in names if name is not None]`);

add('N01', 'def solve(n: int) -> bool:', `if n < 2:
    return False
divisor = 2
while divisor * divisor <= n:
    if n % divisor == 0:
        return False
    divisor += 1
return True`);

add('N02', 'def solve(n: int) -> list:', `if n < 0 or n > 93:
    raise ValueError("n must be 0..93")
out = []
for i in range(n):
    out.append(i if i < 2 else out[i - 1] + out[i - 2])
return out`);

add('N03', 'def solve(n: int) -> int:', `if n < 0 or n > 20:
    raise ValueError("n must be 0..20")
result = 1
for i in range(2, n + 1):
    result *= i
return result`);

add('N04', 'def solve(n: int) -> list:', `if n < 0 or n > 1000:
    raise ValueError("n must be 0..1000")
out = []
for i in range(1, n + 1):
    if i % 15 == 0:
        out.append("FizzBuzz")
    elif i % 3 == 0:
        out.append("Fizz")
    elif i % 5 == 0:
        out.append("Buzz")
    else:
        out.append(str(i))
return out`);

add('N05', 'def solve(n: int) -> int:', `remaining = abs(n)
total = 0
while remaining > 0:
    total += remaining % 10
    remaining //= 10
return total`);

add('N06', 'def solve(n: int) -> bool:', `if n < 0:
    return False
reversed_n = 0
remaining = n
while remaining > 0:
    reversed_n = reversed_n * 10 + remaining % 10
    remaining //= 10
return reversed_n == n`);

add('Q01', 'def solve(labels: list) -> list:', `if labels is None:
    raise ValueError("null")
seen = set()
duplicates = {}  # insertion-ordered set
for label in labels:
    if label in seen:
        duplicates[label] = True
    seen.add(label)
return list(duplicates)`);

add('Q02', 'def solve(codes: list) -> dict:', `if codes is None:
    raise ValueError("null")
counts = {}
for code in codes:
    counts[code] = counts.get(code, 0) + 1
return counts`);

add('Q03', 'def solve(lines: list) -> int:', `if lines is None:
    raise ValueError("null")
count = 0
for line in lines:
    if line is None:
        continue
    tokens = line.split(maxsplit=1)
    if tokens and tokens[0] == "ERROR":
        count += 1
return count`);

add('Q04', 'def solve(expected: dict, actual: dict) -> bool:', `if expected is None or actual is None:
    raise ValueError("null map")
return expected == actual  # dict equality ignores insertion order`);

add('Q05', 'def solve(ids: list) -> list:', `if ids is None:
    raise ValueError("null")
seen = set()
duplicate_ids = {}  # insertion-ordered set
for id_ in ids:
    if id_ is None or id_.strip() == "":
        raise ValueError("invalid ID")
    if id_ in seen:
        duplicate_ids[id_] = True
    seen.add(id_)
return list(duplicate_ids)`);

add('Q06', 'def solve(id_: str) -> bool:', `return id_ is not None and re.fullmatch(r"TC-[0-9]{4}", id_) is not None`);

add('B01', 'def solve(s: str) -> bool:', `if s is None:
    raise ValueError("null")
pairs = {")": "(", "]": "[", "}": "{"}
stack = []
for c in s:
    if c in "([{":
        stack.append(c)
    elif c in pairs:
        if not stack or stack.pop() != pairs[c]:
            return False
    else:
        raise ValueError("brackets only")
return not stack`);

add('B02', 'def solve(s: str) -> int:', `if s is None:
    raise ValueError("null")
last = {}  # char -> last index seen
left = best = 0
for right, c in enumerate(s):
    if c in last:
        left = max(left, last[c] + 1)
    last[c] = right
    best = max(best, right - left + 1)
return best`);

export const python = P;
const HEADER = 'import re\nfrom typing import Optional\n\n\n';
const indent = body => body.split('\n').map(l => (l ? '    ' + l : l)).join('\n');
export function pyCode(q) { const p = P[q.id]; return `${HEADER}${p.sig}\n${indent(p.body)}\n`; }
export function pyStarter(q) { const p = P[q.id]; return `${HEADER}${p.sig}\n    # Write your solution here.\n    raise NotImplementedError("Implement solve")\n`; }

// Python literal for a JSON value. rawKeys/rawStrings turn numeric strings into int literals
// (the JS reference keeps long values and Integer map keys as strings).
function lit(v, raw = false, rawKeys = false) {
  if (v === null || v === undefined) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') return raw && /^-?\d+$/.test(v) ? v : JSON.stringify(v);
  if (Array.isArray(v)) return '[' + v.map(x => lit(x, raw, rawKeys)).join(', ') + ']';
  return '{' + Object.entries(v).map(([k, x]) => (rawKeys ? k : JSON.stringify(k)) + ': ' + lit(x, raw, rawKeys)).join(', ') + '}';
}
const multi = q => q.param.includes(', ') && !q.param.startsWith('Map<');
export function pyCall(q, sample) {
  if (multi(q) || q.id === 'Q04') return 'solve(' + Object.entries(sample).map(([k, v]) => `${k}=${lit(v)}`).join(', ') + ')';
  return `solve(${lit(sample)})`;
}
export function pyExpected(q, result) { return lit(result, ['N02', 'N03'].includes(q.id), q.id === 'Q02'); }
// A runnable test file: save next to solution.py and run `python3 test_solution.py`.
export function pyHarness(q, execute) {
  const cases = q.samples.map(s => `    (lambda: ${pyCall(q, JSON.parse(JSON.stringify(s)))}, ${pyExpected(q, execute(q, s).result)}),`).join('\n');
  return `# ${q.id} · ${q.title}\n# Sample checks only, not a proof of correctness.\nfrom solution import solve\n\nCASES = [\n${cases}\n]\n\nfailed = 0\nfor i, (run, expected) in enumerate(CASES, 1):\n    try:\n        actual = run()\n    except Exception as e:  # noqa: BLE001\n        actual = f"raised {type(e).__name__}: {e}"\n    ok = actual == expected\n    failed += not ok\n    print(f"Case {i}: {'PASS' if ok else 'FAIL'}  expected={expected!r}  actual={actual!r}")\nprint("All sample cases passed." if not failed else f"{failed} case(s) failed.")\nraise SystemExit(1 if failed else 0)\n`;
}
