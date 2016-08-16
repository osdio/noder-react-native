#!/bin/bash
# patch some node_modules to build and run well

if [ ! -d node_modules ]; then
    npm install
fi

# react-web can't recognize *.android.js and *.ios.js now, so be it
cp post_npm_install/react-native-blur/src/* node_modules/react-native-blur/src/
cp post_npm_install/react-native-scrollable-tab-view/Button.js node_modules/react-native-scrollable-tab-view/

# looks like a BUG
sed -i "s/export default parseHtml = function (html, done) {/export default function (html, done) {/" node_modules/react-native-html-render/lib/htmlParse.js
sed -i "s/                uri = node.attribs.href;/                let uri = node.attribs.href;/" node_modules/react-native-html-render/lib/htmlRender.js
