// Copy to playwright.config.js and set your Qase API token.
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
            token: process.env.QASE_API_TOKEN || 'your-qase-api-token-here',
          },
          project: 'YOUR_PROJECT_CODE',
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
