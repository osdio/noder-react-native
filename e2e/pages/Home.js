/// <reference path="../steps.d.ts" />
'use strict';

let I;

module.exports = {
    _init() {
        I = require('../custom_steps.js')();
    },

    ensureOpen() {
        I.seeElement('~主页');
    }
};
