# Java SDET Interview Lab

A dependency-free browser application with 46 authored exercises, interactive reference traces, editable Java drafts, eight debugging exercises, timed sessions, a 21-day plan, bookmarks, revision scheduling, and browser-local JSON backups.

## Preview

From this directory: `python3 -m http.server 4173` then open http://localhost:4173.

No build step or package installation is required. Fonts have system fallbacks. The app can be hosted by any static HTTP server.

## Java execution

The browser does not compile or run submissions. It clearly labels reference traces and outputs. Status and mock-interview rubric scores are manual self-assessments; no verified accuracy is invented. To execute your solution locally, download Solution.java and TestRunner.java from the question's practice desk, then run:

```sh
javac Solution.java TestRunner.java
java TestRunner
```

The harness contains executable sample assertions, not an exhaustive correctness proof. It runs only on the learner's machine. User-authored code is never uploaded to a third-party compiler.

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

Storage key: `sdet-lab-v1`. Data is local to the browser origin. Backups import by merging stable question IDs, keeping future IDs. Changing between preview and hosted origins requires export/import. Time counts only while the practice workspace is visible and focused; it is not a productivity measure. Viewing solutions never automatically records a solve or mastery.

## GitHub Pages

Publish from the main branch and repository root in Settings → Pages. The .nojekyll file serves the authored static files directly. Progress remains browser-local; use export/import when switching origins or devices.
