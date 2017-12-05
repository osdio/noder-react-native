/// <reference path="../steps.d.ts" />
'use strict';

let I, AlertFragment;

module.exports = {
    _init() {
        I = require('../custom_steps.js')();
        AlertFragment = require('../fragments/Alert');
        AlertFragment._init();
    },

    workaroundOfStartNative() {
        // When test on Android, I found that src/Home.js need Alert and click here,
        // then following testing contain ~ locator comes from accessibiltyLabel in
        // any react-native component can be capture successly.
        // If you fix this workaround, please tell me <flyskywhy@gmail.com>
        AlertFragment.clickButton1();
    },

    toHome() {
        I.runInWeb(() => {
            I.amOnPage('/');
        });

        this.workaroundOfStartNative();
    }
};
