# Noder - A React-Native Client for [cnodejs.org](http://cnodejs.org)

 
> A new [cnodejs.org](http://cnodejs.org) mobile app powered by [React-Native](http://facebook.github.io/react-native/). 


## Develop

If you want to run it on you local simulator, you should:

```
git clone https://github.com/soliury/noder-react-native.git
npm install

```
Then click run in Xcode, if failed, you should rebuild all package that this project used in Xcode(Just choose the package and **command+B** to run compile)

If you want to run on you local iPhone app, you should follow the [doc](http://facebook.github.io/react-native/docs/runningondevice.html#content).

If you don't want to update the ip by hand, you can use this:

```
gulp replace
```

Although, there is a good command, just run:

```
npm start
```

This will auto replace the ip, and then run the react-native packager.


## ScreenShots

![noder](http://7lrzfj.com1.z0.glb.clouddn.com/soliurynoder.gif)



## React-Native Modules Used

* [react-native-button](https://github.com/ide/react-native-button)
* [react-native-camera](https://github.com/lwansbrough/react-native-camera)
* [react-native-icons](https://github.com/corymsmith/react-native-icons)
* [react-native-keyboardevents](https://github.com/johanneslumpe/react-native-keyboardevents)
* [react-native-modal](https://github.com/brentvatne/react-native-modal)
* [react-native-overlay](https://github.com/brentvatne/react-native-overlay)
* [react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view)

Thanks All above.

## ToDo List

* Add up reply
* Add setting panel
* Add login out functional
* Add Push Notification
* Add about panel
* Move the HTML render to a single Module
* Refactor code
* Solve the big bug 
  * ***In ListView, sometime scroll on the bottom it can't refresh***
  * ListView **take too much memory**
  * HTML to native View render take too much **memory and time**
* Push to App Store  
* Add test 

## Change log

See [CHANGELOG]()

## Contribute

If you find any bugs, just solve it and submit a PR.

About the code style, Please use the ES6 JSX.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)


  






