// Base URL is defined here (test/code level), not from CI.
// CI sets QASE_TESTOPS_* env vars from workflow inputs/secrets.
// Local: copy to playwright.config.js and set token or use env.
// playwright.config.js is gitignored to keep tokens out of the repo.

const config = {
  workers: 8,
  fullyParallel: true,
  use: {
    baseURL: 'https://test-track-express.lovable.app',
    screenshot: 'on',
    video: 'on',
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        debug: false,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN || 'your-qase-api-token-here',
          },
          project: process.env.QASE_TESTOPS_PROJECT || 'YOUR_PROJECT_CODE',
          uploadAttachments: true,
          showPublicReportLink: true,
          run: {
            complete: process.env.QASE_TESTOPS_RUN_COMPLETE !== 'false',
          },
        },
        framework: {
          browser: {
            addAsParameter: true,
            parameterName: 'Browser Name',
          },
          markAsFlaky: true,
        },
      },
    ],
  ],
};
module.exports = config;
