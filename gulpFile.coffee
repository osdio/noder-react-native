gulp = require 'gulp'
replace = require 'gulp-replace'
gutil = require 'gulp-util'
runSequence = require 'run-sequence'
devIp = require 'dev-ip'


child_process = require 'child_process'

appDelegateSrc = './iOS/AppDelegate.m'
port = 8081


gulp.task 'replace', ->
    ip = devIp()[0]
    reg = ///
        jsCodeLocation\s=\s
        \[NSURL\sURLWithString:
        @"http:.*\n
    ///g
    #  ip = 'localhost'
    gulp.src appDelegateSrc
    .pipe replace reg, "jsCodeLocation = [NSURL URLWithString:@\"http://#{ip}:#{port}/index.ios.bundle\"];\n"
    .pipe gulp.dest './iOS'


gulp.task 'package', (cb)->
    cmd = "./node_modules/react-native/packager/packager.sh"
    start = child_process.spawn cmd, ['--port', port]
    start.stdout.on 'data', (data)->
        gutil.log data.toString()
    start.stderr.on 'data', (data)->
        gutil.log data.toString()


gulp.task 'start', ->
    runSequence 'replace', 'package'
