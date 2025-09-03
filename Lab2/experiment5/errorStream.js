const fs = require("fs");

const readStream = fs.createReadStream("file.txt");

readStream.on("data", chunk => {
  console.log(chunk);
});

readStream.on("error", err => {
  console.error("Caught error while reading stream:", err.message);
});
