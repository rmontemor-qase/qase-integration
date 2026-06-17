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

/**
 * Run description with a link back to the GitHub Actions workflow run.
 * Only populated in CI (the GITHUB_* vars are set by GitHub Actions);
 * returns undefined locally so no description is added.
 */
function getRunDescription() {
  const { GITHUB_SERVER_URL, GITHUB_REPOSITORY, GITHUB_RUN_ID, GITHUB_WORKFLOW } = process.env;
  if (GITHUB_SERVER_URL && GITHUB_REPOSITORY && GITHUB_RUN_ID) {
    const url = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
    return `Triggered from GitHub Actions (\`${GITHUB_WORKFLOW || 'workflow'}\`) on branch \`${getBranch()}\`.\n\n[View workflow run on GitHub](${url})`;
  }
  return undefined;
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
            description: getRunDescription(),
          },
          /** Send the git branch the tests ran from as a Qase configuration */
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
