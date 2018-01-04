var http = require('http');
var url = require('url');
var dt = require('./myfirstmodule');
http.createServer(function (req, res) {
    console.log("a request received");
    console.log("id=" + url.parse(req.url,true).query.id);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write("<h1 style='text-align: center;'>hello world!</h1>&nbsp;date:" + dt.myDateTime());
    res.end();
}).listen(8080);



