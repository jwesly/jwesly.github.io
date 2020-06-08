var static = require('node-static');
 
var fileServer = new static.Server();
console.log("Starting Server");
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
    	console.log("Serving "+request.url)
        fileServer.serve(request, response);
    }).resume();
}).listen(80);