var htmlparser = require('./htmlparser2');


var blockTagArr = ['div', 'p', 'img', 'address',
    'blockquote', 'dir', 'dl',
    'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'menu', 'ol', 'pre', 'table', 'ul', 'li', 'hr'];

var inlineTagArr = ['a', 'abbr', 'b', 'big',
    'br', 'cite', 'code', 'em', 'label', 'span', 'strong'];


var parseHtml = function (html, done) {
    var rootStack = [{
        name: 'div'
    }];
    var tagStack = [rootStack[0]];

    var opts = {
        recognizeSelfClosing: true,
        lowerCaseAttributeNames: true,
        lowerCaseTags: true,
        decodeEntities: true
    };

    var parser = new htmlparser.Parser({
        onopentag: function (name, attribs) {
            //console.log('open:');
            //console.log('name:' + name);
            //console.log('attribs:' + attribs);
            var parent = tagStack[tagStack.length - 1];
            if (!parent.children) parent.children = [];

            if (indexOf(name, blockTagArr) == 1) {
                parent.children.push({
                    name: name,
                    attribs: attribs,
                    type: 'block',
                    parent: parent
                });
                tagStack.push(parent.children[parent.children.length - 1]);
            }
            else {
                //var inlineTagStack = [];
                //searchBlockTagInTree(parent,inlineTagStack, function (blockTag) {
                //
                //});

                var type = 'inline';
                if (parent.name == 'pre') type = 'block';


                parent.children.push({
                    name: name,
                    attribs: attribs,
                    type: type,
                    parent: parent
                });
                tagStack.push(parent.children[parent.children.length - 1]);
            }
        },
        ontext: function (text) {
            //console.log('text:' + text);

            if (text == '\n') return;
            var parent = tagStack[tagStack.length - 1];
            if (!parent.children) parent.children = [];

            parent.children.push({
                name: 'text',
                text: text,
                parent: parent,
                type: 'inline'
            });
        },
        onclosetag: function (name) {
            //console.log('close:' + name);
            tagStack.pop();
        },
        onend: function () {
            //console.log('********************** end ************************');
            //console.log(rootStack[0].children[0].children);
            done(rootStack[0].children);
        }
    }, opts);


    function indexOf(item, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (item == arr[i]) return true;
        }
        return false;
    }

    //var htmlStr = "<div class=\"markdown-text\"><p>GitHub repo 地址：<a href=\"https://github.com/alsotang/node-lessons\">https://github.com/alsotang/node-lessons</a></p>\n<p>如果大家认为漏了哪些初学者应会的内容，可以在此留言，或者开个 issue 给我（!!推荐）。</p>\n<hr>\n<h1>《Node.js 包教不包会》 – by alsotang</h1>\n<h1>为何写作此课程</h1>\n<p>在 CNode(<a href=\"https://cnodejs.org/\">https://cnodejs.org/</a>) 混了那么久，解答了不少 Node.js 初学者们的问题。回头想想，那些问题所需要的思路都不难，但大部分人由于练手机会少，所以在遇到问题的时候很无措。国内唯一一本排的上号的 Node.js 书是 @朴灵(<a href=\"https://github.com/JacksonTian\">https://github.com/JacksonTian</a>) 的 《深入浅出Node.js》(<a href=\"http://book.douban.com/subject/25768396/\">http://book.douban.com/subject/25768396/</a> )，但这本书离实战还是比较远的。</p>\n<p>这个课程是希望提供更多的 Node.js 实战机会，通过每一节精心安排的课程目标，让 Node.js 的初学者们可以循序渐进地，有目的有挑战地开展 Node.js 的学习。</p>\n<p>更多 Node.js 入门资料请前往：<a href=\"https://cnodejs.org/getstart\">https://cnodejs.org/getstart</a></p>\n<h1>课程列表</h1>\n<ul>\n<li>Lesson 0: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson0\">《搭建 Node.js 开发环境》</a></li>\n<li>Lesson 1: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson1\">《一个最简单的 express 应用》</a></li>\n<li>Lesson 2: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson2\">《学习使用外部模块》</a></li>\n<li>Lesson 3: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson3\">《使用 superagent 与 cheerio 完成简单爬虫》</a></li>\n<li>Lesson 4: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson4\">《使用 eventproxy 控制并发》</a></li>\n<li>Lesson 5: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson5\">《使用 async 控制并发》</a></li>\n<li>Lesson 6: <a href=\"https://github.com/alsotang/node-lessons/tree/master/lesson6\">《测试用例：mocha，should，istanbul》</a></li>\n<li>Lesson 7: 《测试用例：supertest》</li>\n<li>Lesson 8: 《Mongodb 与 Mongoose 的使用》</li>\n<li>Lesson 9: 《一个简单的 blog》</li>\n</ul>\n<h1>License</h1>\n<p>MIT</p>\n</div>";
    //
    //htmlStr = htmlStr.replace(/\n/g, '');
    //console.log(htmlStr);

    //html = html.replace(/\n/g, '');
    //console.log(html);


    parser.write(html);
    parser.end();
};

//parseHtml()


module.exports = parseHtml;



