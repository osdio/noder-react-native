/// <reference path="../steps.d.ts" />
'use strict';

let I;

module.exports = {
    _init() {
        I = require('../custom_steps.js')();
    },

    button1: {
        android: {
            id: 'android:id/button1'
        }
    },

    clickButton1() {
        this.button1[process.profile] && I.click(this.button1[process.profile]);
    }
};
