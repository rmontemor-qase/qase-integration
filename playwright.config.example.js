// CI: used with env vars (QASE_API_TOKEN secret, BASE_URL + QASE_PROJECT from inputs/vars).
// Local: copy to playwright.config.js and set env or edit the fallbacks below.
// playwright.config.js is gitignored to keep tokens out of the repo.

const config = {
  workers: 8,
  fullyParallel: true,
  use: {
    baseURL: process.env.BASE_URL || 'https://test-track-express.lovable.app',
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
            token: process.env.QASE_API_TOKEN || 'your-qase-api-token-here',
          },
          project: process.env.QASE_PROJECT || 'YOUR_PROJECT_CODE',
          uploadAttachments: true,
          showPublicReportLink: true,
          run: {
            complete: true,
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
