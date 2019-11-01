const seleniumVersions = {
  // check for more recent versions of selenium here:
  // https://selenium-release.storage.googleapis.com/index.html
  version: '3.141.59',
  baseURL: 'https://selenium-release.storage.googleapis.com',
  drivers: {
    chrome: {
      // check for more recent versions of chrome driver here:
      // https://chromedriver.storage.googleapis.com/index.html
      version: '76.0.3809.126',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    firefox: {
      // check for more recent versions of geckodriver here:
      // https://github.com/mozilla/geckodriver/releases/
      version: '0.26.0',
      arch: process.arch,
      baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
    },
  },
}

exports.config = {

  specs: [
    './tests/**/*.js'
  ],

  exclude: [
  ],

  maxInstances: Number(process.env.EE_BROWSER_COUNT) || 4,


  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // By default WebdriverIO commands are executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // e.g. using promises you can set the sync option to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: process.env.EE_LOG_LEVEL || 'error',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: process.env.EE_BAIL || 1,
  //
  // Saves a screenshot to a given path if a command fails.
  //screenshotPath: './tests/errorShots/',
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: 'http://localhost',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: Number(process.env.EE_TIMEOUT_MILLIS) || 6000,
  //
  // Default timeout in milliseconds for request
  // if Selenium Grid doesn't send response
  connectionRetryTimeout: 90000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as properties. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  // plugins: {
  //     webdrivercss: {
  //         screenshotRoot: 'my-shots',
  //         failedComparisonsRoot: 'diffs',
  //         misMatchTolerance: 0.05,
  //         screenWidth: [320,480,640,1024]
  //     },
  //     webdriverrtc: {},
  //     browserevent: {}
  // },
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: ['selenium-standalone'],


  seleniumArgs: seleniumVersions,
  seleniumInstallArgs: seleniumVersions,

  //
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'jasmine',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['spec'],

  //
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    //
    // Jasmine default timeout
    defaultTimeoutInterval: 45000,
    //
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function(passed, assertion) {
      // do something
    }
  },
}

exports.config.capabilities = [
  {
    browserName: 'chrome',
    'goog:chromeOptions': {
    }
  },
  {
    browserName: 'firefox',
    'moz:firefoxOptions': {
      binary: process.env.EE_FIREFOX_BINARY,
      prefs: {
        'app.update.auto': false,
        'app.update.enabled': false,
        // Set "browser.anchor_color" to verify the prefs are applied correctly or not.
        //'browser.anchor_color': '#FF0000',
      },
    },
  }
]

if (!process.env.EE_HEADLESS || process.env.EE_HEADLESS != '0') {
  const chromeCapability = exports.config.capabilities.find(conf => conf.browserName === 'chrome')
  chromeCapability['goog:chromeOptions'].args = ['--headless', '--disable-gpu', '--window-size=1280,800']

  const firefoxCapability = exports.config.capabilities.find(conf => conf.browserName === 'firefox')
  firefoxCapability['moz:firefoxOptions'].args = ['-headless', '--window-size=1280,800']
}

if (process.env.SELENIUM_BROWSER) {
  exports.config.capabilities = exports.config.capabilities.filter(conf => conf.browserName === process.env.SELENIUM_BROWSER)
} else {
  exports.config.capabilities = exports.config.capabilities.filter(conf => conf.browserName === "firefox")
}

if (process.env.EE_WDIO_EXEC_ARGV) {
  exports.config.execArgv = [process.env.EE_WDIO_EXEC_ARGV]
}
