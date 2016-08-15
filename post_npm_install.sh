#!/bin/bash
# patch some node_modules to build well

if [ ! -d node_modules ]; then
    npm install
fi

# react-web can't recognize *.android.js and *.ios.js now, so be it
cp post_npm_install/react-native-blur/src/* node_modules/react-native-blur/src/
cp post_npm_install/react-native-scrollable-tab-view/Button.js node_modules/react-native-scrollable-tab-view/
