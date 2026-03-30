require('dotenv').config();

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
