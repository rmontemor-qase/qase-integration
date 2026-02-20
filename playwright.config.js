const config = {
  use: {
    screenshot: 'on',
    video: 'on',
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        debug: true,

        testops: {
          api: {
            token: 'f447c8bf425837227704d402749969a9705538691eadabb83f17443c02b81953',
          },

          project: 'ECSE',
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