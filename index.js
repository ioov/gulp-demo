var http = require('http');

http.createServer(function(req, res){

	res.writeHeader({type: 'text/html'});
	res.end('hello');

}).listen(8080);