// Runs every Python reference solution against the generated sample harness.
// Usage: node checks/verify_python.mjs   (requires python3 on PATH)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {bank, execute} from '../bank.mjs';
import {python, pyCode, pyStarter, pyHarness} from '../python.mjs';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sdet-py-checks-'));
let failed = 0;
for (const q of bank) {
  if (!python[q.id]) { console.log(`${q.id} MISSING python solution`); failed++; continue; }
  const dir = path.join(root, q.id);
  fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, 'solution.py'), pyCode(q));
  fs.writeFileSync(path.join(dir, 'starter.py'), pyStarter(q));
  fs.writeFileSync(path.join(dir, 'test_solution.py'), pyHarness(q, execute));
  try {
    execFileSync('python3', ['-m', 'py_compile', 'starter.py'], {cwd: dir});
    execFileSync('python3', ['test_solution.py'], {cwd: dir, encoding: 'utf8'});
    console.log(`${q.id} ok`);
  } catch (e) {
    failed++;
    console.log(`${q.id} FAILED\n${e.stdout || ''}${e.stderr || ''}`);
  }
}
fs.rmSync(root, {recursive: true, force: true});
console.log(failed ? `${failed} question(s) failed` : `All ${bank.length} Python solutions pass their sample cases.`);
process.exit(failed ? 1 : 0);
