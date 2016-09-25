#!/bin/bash
# patch some node_modules to build and run well

if [ ! -d node_modules ]; then
    npm install
fi

# looks like a BUG
sed -i "s/export default parseHtml = function (html, done) {/export default function (html, done) {/" node_modules/react-native-html-render/lib/htmlParse.js
sed -i "s/                uri = node.attribs.href;/                let uri = node.attribs.href;/" node_modules/react-native-html-render/lib/htmlRender.js
