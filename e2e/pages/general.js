/// <reference path="../steps.d.ts" />

// Page object for General page (shared element/operations across all pages)
'use strict';

let I;

module.exports = {
    _init() {
        I = actor();
    },

    swipeLeft() {
        I.touchPerform([{
            action: 'press',
            options: {
                x: 400,
                y: 200
            }
        }, {
            action: 'moveTo',
            options: {
                x: -300
            }
        }, {
            action: 'release'
        }, {
            action: 'wait',
            options: {
                ms: 100
            }
        }]);
    },

    click(x, y) {
        I.touchPerform([{
            action: 'press',
            options: {
                x,
                y,
            }
        }, {
            action: 'release'
        }]);
    }
};
