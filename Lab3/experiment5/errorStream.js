// file: errorStream.js
const fs = require("fs");

const readStream = fs.createReadStream("no_such_file.txt", "utf8");

readStream.on("data", chunk => {
  console.log(chunk);
});

readStream.on("error", err => {
  console.error("Caught error while reading stream:", err.message);
});
