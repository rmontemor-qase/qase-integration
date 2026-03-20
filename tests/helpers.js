/**
 * Helpers for demo-friendly automation: visible pauses, logging to console + Qase-bound output,
 * and explicit failure messages (appear in Playwright/Qase results).
 */

/** Pause after a visible UI action so recordings/screenshots show each step clearly. */
export const RECORD_PAUSE_MS = 1000;

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} [ms]
 */
export async function recordPause(page, ms = RECORD_PAUSE_MS) {
  await page.waitForTimeout(ms);
}

/**
 * Logs to stdout (captured in CI/Qase) and attaches a short text note to the test result when possible.
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {string} message
 */
export function demoLog(_testInfo, message) {
  console.log(`[Test Track QA] ${message}`);
}

/**
 * Assertion with an explicit message for Qase / failure reports.
 * @param {boolean} condition
 * @param {string} message Human-readable: what was checked and what failed
 */
export function assertDemo(condition, message) {
  if (!condition) {
    throw new Error(
      `ASSERTION FAILED — ${message}. ` +
        'See recording/screenshot for UI state. Fix the app or update the expected value.',
    );
  }
}

/**
 * Wrap Playwright expect failures with extra context (append to default matcher output).
 * Use in catch blocks for critical checks.
 * @param {import('@playwright/test').TestInfo} testInfo
 * @param {string} context
 * @param {Error} err
 */
export async function logAssertionError(testInfo, context, err) {
  const msg = `[Test Track QA] CHECK FAILED: ${context} — ${err?.message || err}`;
  console.error(msg);
  try {
    await testInfo.attach('failure-context.txt', {
      body: msg,
      contentType: 'text/plain',
    });
  } catch {
    /* ignore */
  }
}
