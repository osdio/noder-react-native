# Noder - A React-Native Client for [cnodejs.org](http://cnodejs.org)

> A new [cnodejs.org](http://cnodejs.org) mobile & web app powered by [react-native](http://facebook.github.io/react-native/) and [react-web](https://github.com/flyskywhy/react-web) and [CodeceptJS](https://github.com/Codeception/CodeceptJS) .


## Install

**微信浏览器中若无法打开安装链接，请复制链接到系统浏览器中打开**

* iOS: https://itunes.apple.com/cn/app/noder/id1106775857
* android(v1.0.0-alpha2): https://www.pgyer.com/noder

## Develop

For local development you need to follow the below commands:

```
git clone https://github.com/soliury/noder-react-native.git noder
cd noder
yarn install
```


Click the run button in Xcode, if something went wrong, you need to rebuild all packages that be used in this project with Xcode (Just select the package and press **command+B** to run compile).

If you want to run it on your iPhone, please follow the [Offical Doc](http://facebook.github.io/react-native/docs/runningondevice.html#content).

If you want to run it on your Android, please run:
```
npm run android
npm start
```

If you want to run it on your Browser (localhost:3000), please run:
```
npm run web
```


## e2e test
JS app code in `src/`write once run on Android, iOS and Web by react-native and react-web, now JS test case in `e2e/` with locator ~ write once run on them too with [CodeceptJS](https://github.com/Codeception/CodeceptJS) .
### Web test
After install server side of test by `npm run e2e-update-server-web`, please run:
```
npm run web
npm run e2e-server-web
```
Then run client side of test by `npm run e2e-web`, thus a web page will be opened in firefox automatically and complete the test.

### Android test
After install server side of test by `npm install -g appium`, please run:
```
npm run android
npm start
npm run e2e-server-native
```
Then run client side of test by `npm run e2e-android`, thus an apk will be installed to android automatically and complete the test.

If `npm install -g appium` is unavailable in china, ref to [node_modules-appium](https://github.com/flyskywhy/node_modules-appium) .


## Screenshots

![noder](http://7lrzfj.com1.z0.glb.clouddn.com/soliurynoder-v1.0.0.gif)


## React-Native Modules In Using

* [redux](https://github.com/gaearon/redux)
* [react-native-button](https://github.com/ide/react-native-button)
* [react-native-barcodescanner](https://github.com/ideacreation/react-native-barcodescanner)
* [react-native-blur](https://github.com/react-native-fellowship/react-native-blur)
* [react-native-camera](https://github.com/lwansbrough/react-native-camera)
* [react-native-html-render](https://github.com/soliury/react-native-html-render)
* [react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

This project is heavily influenced by the above modules.

## ToDo List

* Push Notification
* Fix the below bugs
  * In ListView, sometime items on the bottom can't be refreshed
  * ListView **take too much memory**
  * HTML to native View render take too much **memory and CPU time**
* Add Unit testing

## Change log

Please read [CHANGELOG](https://github.com/soliury/noder-react-native/releases)

## Contribute

If you find any issues, just solve it and make a PR.

This project is under the ES6 JSX.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
