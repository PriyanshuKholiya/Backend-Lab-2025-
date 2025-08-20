const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello, this is a response from the server!');
    res.end();
}).listen(3000);
