import { createServer } from 'http';
import { readFile } from 'fs';

createServer((req, res) => {
    readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data);
    });
}).listen(3000);
