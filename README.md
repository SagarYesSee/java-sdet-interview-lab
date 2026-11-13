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

Publish from the main branch and repository root in Settings → Pages. The .nojekyll file serves the authored static files directly. Progress remains browser-local unless cloud sync is connected.

## Cloud progress saving (no sign-in)

Click the cloud button to create a private sync code. Copy that code to another device and choose **Connect & sync**. Completed questions and Java/Python drafts merge automatically; theme, language and sidebar settings stay device-local. Anyone with the code can access and modify the save. There is no recovery for a lost code. Disconnect keeps the browser copy.

Existing browser progress uploads when creating or connecting a code. Changes merge per question field using device timestamps (keep device clocks accurate); newer changes win, including marking a question incomplete. Devices sync after edits, when focused or brought online, and every 20 seconds while open. Offline changes remain local and retry automatically. Concurrent cloud writes use revision checks and retry the merge. Joining an unknown code fails instead of creating an empty save.

Deploy the separate backend in your existing Cloudflare account; your other project's resources are independent:

1. Run `npx wrangler login` if this terminal is not already authenticated.
2. Run `npx wrangler d1 create sdet-lab-progress`. Copy the resulting database ID into `cloudflare/wrangler.toml`.
3. Set `ALLOWED_ORIGIN` in that file to your site's origin, such as `https://yourname.github.io` (no repository path or trailing slash).
4. Run `npx wrangler d1 execute sdet-lab-progress --remote --file=cloudflare/schema.sql --config=cloudflare/wrangler.toml`.
5. Run `npx wrangler deploy --config=cloudflare/wrangler.toml`.
6. Set `SYNC_URL` in `sync-config.mjs` to the deployed HTTPS Worker URL and publish the updated static files.

The Worker stores only a SHA-256 hash of the random 256-bit code, accepts bounded saves, and uses prepared D1 statements. Codes are sent in authorization headers, never URL parameters. The code is remembered in browser local storage, so only connect on trusted devices. There are no passwords or Cloudflare API keys in the frontend. This small backend does not include abuse rate limiting; monitor your Cloudflare usage before sharing the site widely.

Backend setup reference: [Cloudflare D1 getting started](https://developers.cloudflare.com/d1/get-started/).

Run cloud-save checks with `node --test checks/sync.test.mjs`. These exercise merge behavior and the Worker API using a D1 test double; a deployed smoke test is still needed after configuring your account.
