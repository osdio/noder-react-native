'use strict';

class ReactWeb extends Helper {
    // // before/after hooks
    // _before() {
    //   // remove if not used
    // }

    // _after() {
    //   // remove if not used
    // }

    // add custom methods here
    // If you need to access other helpers
    // use: this.helpers['helperName']

    /**
     * Execute code only on iOS
     *
     * ```js
     * I.runOnIOS(() => {
     *    I.click('//UIAApplication[1]/UIAWindow[1]/UIAButton[1]');
     *    I.see('Hi, IOS', '~welcome');
     * });
     * ```
     *
     * Additional filter can be applied by checking for capabilities.
     * For instance, this code will be executed only on iPhone 5s:
     *
     *
     * ```js
     * I.runOnIOS({deviceName: 'iPhone 5s'},() => {
     *    // ...
     * });
     * ```
     *
     * @param {*} caps
     * @param {*} fn
     */
    runOnIOS(caps, fn) {
        return;
    }

    /**
     * Execute code only on Android
     *
     * ```js
     * I.runOnAndroid(() => {
     *    I.click('io.selendroid.testapp:id/buttonTest');
     * });
     * ```
     *
     * Additional filter can be applied by checking for capabilities.
     * For instance, this code will be executed only on Android 6.0:
     *
     *
     * ```js
     * I.runOnAndroid({platformVersion: '6.0'},() => {
     *    // ...
     * });
     * ```
     *
     * @param {*} caps
     * @param {*} fn
     */
    runOnAndroid(caps, fn) {
        return;
    }

    /**
     * Execute code only in Web mode.
     *
     * ```js
     * I.runInWeb(() => {
     *    I.waitForElement('#data');
     *    I.seeInCurrentUrl('/data');
     * });
     * ```
     *
     * @param {*} fn
     */
    runInWeb(fn) {
        return fn();
    }
}

module.exports = ReactWeb;
