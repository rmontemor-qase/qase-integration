require('dotenv').config();
const { execSync } = require('child_process');

/**
 * Branch the tests are running from.
 * In CI, GitHub Actions sets GITHUB_REF_NAME automatically; locally we fall
 * back to the current git branch.
 */
function getBranch() {
  if (process.env.GITHUB_REF_NAME) return process.env.GITHUB_REF_NAME;
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

const config = {
  workers: 8,
  fullyParallel: true,
  projects: [
    { name: 'smoke', testMatch: /smoke\.spec\.js/ },
    { name: 'core-regression', testMatch: /core-regression\.spec\.js/ },
    { name: 'full-regression', testMatch: /full-regression\.spec\.js/ },
  ],
  use: {
    baseURL: 'https://gameday-gear.lovable.app',
    screenshot: 'on',
    video: 'on',
    /** Richer failure evidence in Qase when uploadAttachments is true */
    trace: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        debug: false,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN,
          },
          project: 'DAT',
          uploadAttachments: true,
          showPublicReportLink: true,
          run: {
            complete: true,
          },
          /**
           * Send the git branch as a Qase configuration. This only takes effect
           * when the reporter CREATES the run (i.e. local runs). In CI the run
           * is pre-created and passed via QASE_TESTOPS_RUN_ID, so the branch is
           * attached by the workflow's API step instead.
           */
          configurations: {
            values: [{ name: 'Branch', value: getBranch() }],
            createIfNotExists: true,
          },
        },
        framework: {
          browser: {
            addAsParameter: false,
            parameterName: 'Browser Name',
          },
          markAsFlaky: true,
        },
      },
    ],
  ],
};
module.exports = config;
