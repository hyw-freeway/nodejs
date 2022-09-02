var http = require("http");

http.createServer(function(req,res){
    res.writeHead(200, {'Content-type':'text/plain'});

    res.end('hello, new day!\n');
}).listen(8888);

console.log("http://127.0.0.1:8888/")