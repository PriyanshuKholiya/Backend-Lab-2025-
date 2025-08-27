// file: pipeStream.js
const fs = require("fs");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Piping completed! input.txt → output.txt");
});

readStream.on("error", err => {
  console.error("Error reading input file:", err.message);
});

writeStream.on("error", err => {
  console.error("Error writing output file:", err.message);
});
