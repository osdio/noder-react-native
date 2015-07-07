module.exports = {
    "data": {
        "id": "55604d9c4eb040084cfe5d4a",
        "author_id": "51ed5627f4963ade0ea60395",
        "tab": "share",
        "content": "<div class=\"markdown-text\"><h1>Markdown 语法简明手册</h1>\n<blockquote>\n<p>$ 表示行内公式：\n质能守恒方程可以用一个很简洁的方程式 $E=mc^2$ 来表达</p>\n</blockquote>\n<h3>1. 使用 * 和 ** 表示斜体和粗体</h3>\n<p>示例：</p>\n<p>这是 <em>斜体</em>，这是 <strong>粗体</strong>。</p>\n<h3>2. 使用 === 表示一级标题，使用 — 表示二级标题</h3>\n<p>示例：</p>\n<h1>这是一个一级标题</h1>\n<h2>这是一个二级标题</h2>\n<h3>这是一个三级标题</h3>\n<h4>这是个四级标题</h4>\n<h5>这是个五级标题</h5>\n<h6>这是个六级标题</h6>\n<p>你也可以选择在行首加井号表示不同级别的标题，例如：# H1, ## H2, ### H3。</p>\n<h3>3. 使用 [描述](链接地址) 为文字增加外链接</h3>\n<p>示例：</p>\n<p>这是去往 <a href=\"http://ghosertblog.github.com\">本人博客</a> 的链接。</p>\n<h3>4. 在行末加两个空格表示换行</h3>\n<p>示例：</p>\n<p>第一行(此行最右有两个看不见的空格)<br>\n第二行</p>\n<h3>5. 使用 *，+，- 表示无序列表</h3>\n<p>示例：</p>\n<ul>\n<li>无序列表项 一</li>\n<li>无序列表项 二</li>\n<li>无序列表项 三</li>\n</ul>\n<h3>6. 使用数字和点表示有序列表</h3>\n<p>示例：</p>\n<ol>\n<li>有序列表项 一</li>\n<li>有序列表项 二</li>\n<li>有序列表项 三</li>\n</ol>\n<h3>7. 使用 &gt; 表示文字引用</h3>\n<p>示例：</p>\n<blockquote>\n<p>野火烧不尽，春风吹又生</p>\n</blockquote>\n<h3>8. 使用 `代码` 表示行内代码块</h3>\n<p>示例：</p>\n<p>让我们聊聊 <code>html</code></p>\n<h3>9.  使用 四个缩进空格 表示代码块</h3>\n<p>示例：</p>\n<pre class=\"prettyprint\"><code>这是一个代码块，此行左侧有四个不可见的空格\n</code></pre><h3>10.  使用 ![描述](图片链接地址) 插入图像</h3>\n<p>示例：</p>\n<p><img src=\"//dn-cnode.qbox.me/Fhm2rfT4GHwqRBEk6Nbp_SWdRZIi\" alt=\"IMG_0417.PNG\"></p>\n<p><img src=\"http://tp3.sinaimg.cn/2204681022/180/5606968568/1\" alt=\"我的头像\"></p>\n<h1>Cmd 高阶语法手册</h1>\n<h3>1. LaTeX 公式，表达式支持</h3>\n<p>$ 表示行内公式：</p>\n<p>质能守恒方程可以用一个很简洁的方程式 $E=mc^2$ 来表达</p>\n<p>$$ 表示整行公式：</p>\n<p>$$\\sum_{i=1}^n a_i=0$$</p>\n<p>$$f(x_1,x_x,\\ldots,x_n) = x_1^2 + x_2^2 + \\cdots + x_n^2 $$</p>\n<p>$$\\sum^{j-1}<em>{k=0}{\\widehat{\\gamma}</em>{kj} z_k}$$</p>\n<h3>2. 加强的代码块，支持四十一种编程语言的语法高亮的显示，行号显示</h3>\n<p>非代码示例：</p>\n<pre class=\"prettyprint\"><code>$ sudo apt-get install vim-gnome\n</code></pre><p>Python 示例：</p>\n<pre class=\"prettyprint language-python\"><code>@requires_authorization\ndef somefunc(param1=&#x27;&#x27;, param2=0):\n    &#x27;&#x27;&#x27;A docstring&#x27;&#x27;&#x27;\n    if param1 &gt; param2: # interesting\n        print &#x27;Greater&#x27;\n    return (param2 - param1 + 1) or None\n\nclass SomeClass:\n    pass\n\n&gt;&gt;&gt; message = &#x27;&#x27;&#x27;interpreter\n... prompt&#x27;&#x27;&#x27;\n</code></pre><p>JavaScript 示例：</p>\n<pre class=\"prettyprint language-javascript\"><code>/**\n* nth element in the fibonacci series.\n* @param n &gt;= 0\n* @return the nth element, &gt;= 0.\n*/\nfunction fib(n) {\n  var a = 1, b = 1;\n  var tmp;\n  while (--n &gt;= 0) {\n    tmp = a;\n    a += b;\n    b = tmp;\n  }\n  return a;\n}\n\ndocument.write(fib(10));\n</code></pre><h3>3. 表格支持</h3>\n<p>示例：</p>\n<table>\n<thead>\n<tr><th>项目</th><th>价格</th><th>数量</th></tr>\n</thead>\n<tbody>\n<tr><td>计算机</td><td>$1600</td><td>5</td></tr>\n<tr><td>手机</td><td>$12</td><td>12</td></tr>\n<tr><td>管线</td><td>$1</td><td>234</td></tr>\n</tbody>\n</table>\n<h3>4. 定义型列表</h3>\n<p>名词 1\n:   定义 1（左侧有一个可见的冒号和四个不可见的空格）</p>\n<p>代码块 2\n:   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）</p>\n<pre class=\"prettyprint\"><code>    代码块（左侧有八个不可见的空格）\n</code></pre><hr>\n</div>",
        "title": "请勿删除此贴，正在调试react-native cnode客户端html渲染",
        "last_reply_at": "2015-06-23T09:00:32.914Z",
        "good": false,
        "top": false,
        "reply_count": 12,
        "visit_count": 636,
        "create_at": "2015-05-23T09:51:24.233Z",
        "author": {
            "loginname": "soliury",
            "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
        },
        "replies": [{
            "id": "55618d248f294e213d10b82c",
            "author": {
                "loginname": "alsotang",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F1147375%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>好用心地在调整格式啊</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-24T08:34:44.076Z"
        }, {
            "id": "556190258f294e213d10b831",
            "author": {
                "loginname": "soliury",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>先来点谍照。。。。</p>\n<p><img src=\"//dn-cnode.qbox.me/Fhm2rfT4GHwqRBEk6Nbp_SWdRZIi\" alt=\"IMG_0417.PNG\"></p>\n<p><img src=\"//dn-cnode.qbox.me/FryQLxDJpwya7RcSpzBrDm3p5JhE\" alt=\"IMG_0418.PNG\"></p>\n<p><img src=\"//dn-cnode.qbox.me/FuKbAhdaBNSkpKj04bo8tjfkp8Ss\" alt=\"IMG_0420.PNG\"></p>\n<pre class=\"prettyprint\"><code>![IMG_0421.PNG](//dn-cnode.qbox.me/Fi93MaU3HXiaBu8mt8LBWr4FODXY)</code></pre></div>",
            "ups": ["551a5c05687c387d2f5b2bff"],
            "create_at": "2015-05-24T08:47:33.126Z"
        }, {
            "id": "556190828f294e213d10b832",
            "author": {
                "loginname": "soliury",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>渲染html时没用webview哦，用得本地视图来显示的哦</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-24T08:49:06.798Z"
        }, {
            "id": "5561e0dd8f294e213d10b864",
            "author": {
                "loginname": "WangZishi",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F8288105%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>期待啊\n自豪地采用 <a href=\"https://github.com/lanceli/cnodejs-ionic\">CNodeJS ionic</a></p>\n</div>",
            "ups": [],
            "create_at": "2015-05-24T14:31:57.215Z"
        }, {
            "id": "5562a8288f294e213d10b8f9",
            "author": {
                "loginname": "booxood",
                "avatar_url": "/agent?url=http%3A%2F%2Fwww.gravatar.com%2Favatar%2F124ea13daf1648975e002b3c5e89d7e2%3Fsize%3D48"
            },
            "content": "<div class=\"markdown-text\"><p>赞</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-25T04:42:16.211Z"
        }, {
            "id": "5562b7f28f294e213d10b913",
            "author": {
                "loginname": "thondery",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F7646730%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>好漂亮，期待试用</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-25T05:49:38.556Z"
        }, {
            "id": "5562c3ce8f294e213d10b920",
            "author": {
                "loginname": "ilanceli",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F874744%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>赞\n不过lz最好自己搭个测试环境</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-25T06:40:14.832Z"
        }, {
            "id": "556547867d4c64752effb524",
            "author": {
                "loginname": "soliury",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p><a href=\"/user/ilanceli\">@ilanceli</a> 没搭，干脆就这么滴了</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-27T04:26:46.910Z"
        }, {
            "id": "556566207d4c64752effb545",
            "author": {
                "loginname": "jysperm",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F1191561%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p>感觉网页版的样式也要调一调 …</p>\n</div>",
            "ups": [],
            "create_at": "2015-05-27T06:37:20.821Z"
        }, {
            "id": "5565db1ebf0bd1f1570a0036",
            "author": {
                "loginname": "soliury",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p><a href=\"/user/jysperm\">@jysperm</a> 要不你来调一调嘛，网页版的确实也需要改进啊\n自豪地采用 <a href=\"https://github.com/lanceli/cnodejs-ionic\">CNodeJS ionic</a></p>\n</div>",
            "ups": [],
            "create_at": "2015-05-27T14:56:30.466Z"
        }, {
            "id": "5589202301d3ce0d73d69106",
            "author": {
                "loginname": "soliury",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><h3>9.  使用 四个缩进空格 表示代码块</h3>\n<p>示例：</p>\n<pre class=\"prettyprint\"><code>这是一个代码块，此行左侧有四个不可见的空格\n</code></pre><h3>10.  使用 ![描述](图片链接地址) 插入图像</h3>\n<p>示例：</p>\n<p><img src=\"http://tp3.sinaimg.cn/2204681022/180/5606968568/1\" alt=\"我的头像\"></p>\n</div>",
            "ups": [],
            "create_at": "2015-06-23T09:00:19.652Z"
        }, {
            "id": "5589203001d3ce0d73d69108",
            "author": {
                "loginname": "soliury",
                "avatar_url": "/agent?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5032079%3Fv%3D3%26s%3D120"
            },
            "content": "<div class=\"markdown-text\"><p><a href=\"/user/soliury\">@soliury</a> ### 9.  使用 四个缩进空格 表示代码块</p>\n<p>示例：</p>\n<pre class=\"prettyprint\"><code>这是一个代码块，此行左侧有四个不可见的空格\n</code></pre><h3>10.  使用 ![描述](图片链接地址) 插入图像</h3>\n<p>示例：</p>\n<p><img src=\"http://tp3.sinaimg.cn/2204681022/180/5606968568/1\" alt=\"我的头像\"></p>\n</div>",
            "ups": [],
            "create_at": "2015-06-23T09:00:32.897Z"
        }]
    }
}