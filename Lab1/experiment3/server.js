import { createServer } from "http";

createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello! This is my Node.js server response.");
  res.end();
}).listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});