let CODECEPT_WORK_PATH = './e2e';

exports.config = {
    output: CODECEPT_WORK_PATH + '/output',
    helpers: process.profile === 'android' || process.profile === 'ios' ? {
        Appium: {
            smartWait: 35000,
            app: process.profile === 'android' ? './android/app/build/outputs/apk/app-debug.apk' : './ios/build/Build/Products/Release-iphonesimulator/e2etest.app',
            platform: process.profile === 'android' ? 'Android' : 'iOS',
            desiredCapabilities: {
                platformVersion: process.profile === 'ios' ? '10.3' : undefined,
                deviceName: process.profile === 'ios' ? 'iPhone Simulator' : 'Android Emulator'
            }
        }
    } : {
        WebDriverIO: {
            url: 'http://localhost:3000',
            browser: 'chrome'
        }
    },
    multiple: {
        android: {
            browsers: ['firefox']
        },
        basic: {
            browsers: ['chrome', 'firefox']
        },
        smoke: {
            grep: '@smoke',
            browsers: [
                'firefox', {
                    browser: 'chrome',
                    windowSize: 'maximize'
                }, {
                    browser: 'chrome',
                    windowSize: '1200x840'
                }
            ]
        }
    },
    include: {
        I: CODECEPT_WORK_PATH + '/custom_steps.js',
        initStep: CODECEPT_WORK_PATH + '/steps/init.js',
        AlertFragment: CODECEPT_WORK_PATH + '/fragments/Alert.js',
        generalPage: CODECEPT_WORK_PATH + '/pages/general.js',
        HomePage: CODECEPT_WORK_PATH + '/pages/Home.js'
    },
    mocha: {},
    bootstrap: false,
    teardown: null,
    hooks: [],
    tests: CODECEPT_WORK_PATH + '/tests/*.js',
    timeout: 10000,
    name: 'Noder'
};
