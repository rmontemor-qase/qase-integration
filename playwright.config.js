require('dotenv').config();

const config = {
  workers: 8,
  fullyParallel: true,
  projects: [
    { name: 'smoke', grep: /@smoke/ },
    { name: 'core-regression', grep: /@smoke|@core-regression/ },
    { name: 'full-regression', grep: /@smoke|@core-regression|@full-regression/ },
  ],
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
            token: process.env.QASE_TESTOPS_API_TOKEN || process.env.QASE_API_TOKEN,
          },
          project: 'TTE',
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
