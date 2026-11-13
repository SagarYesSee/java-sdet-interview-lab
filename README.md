# Java SDET Interview Lab

A dependency-free browser app with 46 interview coding questions, each with a **Java and a Python solution**, interactive reference traces, and an editable practice editor.

There is **one roadmap**: an ordered list of all questions in the left panel (hide/show it with ☰). Work through a question (Understand → Think → Visualize → Solution → Explain & test), press **Mark complete & next**, and the app opens the next unfinished question. Switch Java / Python at the top; drafts are kept separately per language. Dark mode uses a slate + indigo palette.

## Preview

From this directory: `python3 -m http.server 4173` then open http://localhost:4173.

No build step or package installation is required. Fonts have system fallbacks. The app can be hosted by any static HTTP server.

## Running your code

The browser does not compile or run submissions. Download your code and the sample test file from the editor panel, then run locally:

```sh
# Java
javac Solution.java TestRunner.java && java TestRunner
# Python 3.8+
python3 test_solution.py      # expects solution.py in the same folder
```

The harnesses contain sample assertions, not an exhaustive correctness proof.

## Python solutions

`python.mjs` holds one Python solution per question ID with the same contract as the Java version. Ordered sets are returned as lists, maps as dicts (insertion ordered), and multi-argument questions use keyword names matching the sample JSON (`a`, `target`, `k`, `b`, `expected`, `actual`). Verify all of them with:

```sh
node checks/verify_python.mjs
```

## Reference verification

Requires Node and a JDK with `javac --release 8` support:

```sh
node checks/verify.mjs
javac --release 8 /private/tmp/sdet-java-checks/ReferenceChecks.java
java -cp /private/tmp/sdet-java-checks ReferenceChecks
```

173 executable reference checks cover all 46 primary methods, eight alternate approaches, and 11 extra boundary cases. The compatibility compile uses the Java 8 API; execution uses the installed Java 17 runtime. Trace outputs are compared with actual Java sample results. Boundary assertions include duplicate extrema, integer overflow, Fibonacci F92, 20!, binary search on one item, sliding-window regression, whitespace preservation, and map missing-vs-null.

## Content and research

`bank.mjs` is the expandable question bank; IDs are permanent. `research.json` records sources and limitations for 5 Oct–5 Nov 2026. No independently verified firsthand junior Java question was established; recent preparation articles are labeled as resources, never recently asked questions. Anonymous firsthand and shared reports remain unverified.

Every question has three sample cases plus edge-case guidance, hints, solution, complexity, trade-offs, interview rehearsal, and an interactive trace. Richer algorithms show pointer and collection state; library operations use operation-level diagrams. Traces show meaningful state changes rather than every JVM instruction. Character traces support ASCII input so Java UTF-16 and browser display semantics match. Some preconditions are validated by the visualizer rather than by the Java reference (e.g., sorted input and missing-number domain). They are documented in the problem contract.

## Persistence

Storage key: `sdet-lab-v1`, local to the browser origin. It stores completed questions, Java/Python drafts, theme, language and sidebar state. Older saves migrate automatically: questions marked "Solved Independently" or "Mastered" count as complete.

## GitHub Pages

Publish from the main branch and repository root in Settings → Pages. The .nojekyll file serves the authored static files directly. Progress remains browser-local.
