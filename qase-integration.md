# Qase TestOps + Playwright

This repo reports Playwright results to **Qase TestOps** via `playwright-qase-reporter`.

## Setup

1. **API token** — In Qase: *Settings → API Tokens*. Create a token with access to the project below.
2. **`.env`** (do not commit):

   ```env
   QASE_TESTOPS_API_TOKEN=your_token_here
   ```

   The reporter also accepts `QASE_API_TOKEN`.

3. **Project code** — Configured in `playwright.config.js` as `project: 'TTE'`. Change to match your Qase project short code.

## Run tests (and push to Qase)

```bash
npm test
```

Runs all projects (smoke, core-regression, full-regression) and completes the TestOps run when finished.

### Run one suite only

```bash
npx playwright test --project=smoke
npx playwright test --project=core-regression
npx playwright test --project=full-regression
```

## What Qase receives

| Artifact | Config |
|----------|--------|
| **Screenshots** | Every test (`screenshot: 'on'`) |
| **Video** | Every test (`video: 'on'`) |
| **Trace** | On failure (`trace: 'retain-on-failure'`) — timelines, network, DOM |
| **Attachments** | `uploadAttachments: true` — failure media uploaded to the run |
| **Public report link** | `showPublicReportLink: true` — link printed at end of run |

Console lines prefixed with **`[Velocity QA]`** appear in CI logs and help correlate steps with the recording.

## Demo-oriented tests

- **`tests/smoke.spec.js`** — Short checks (~6 scenarios), large visible pauses, `test.step` titles in the report.
- **`tests/core-regression.spec.js` / `full-regression.spec.js`** — Broad coverage; each suite includes **one intentional failure** with an explicit error message (timeline phase count vs. registry “Titanium” rule) so Qase shows a realistic defect with a clear description.

To remove demo failures later, delete or rewrite those two tests (search for `Roadmap must list nine` and `Titanium skid block`).

## Optional: flaky marking

`framework.markAsFlaky: true` — Qase can treat flaky retries according to your project rules.

## References

- App selectors and flows: `automation-guide.md`
- Reporter options: [playwright-qase-reporter](https://www.npmjs.com/package/playwright-qase-reporter)
