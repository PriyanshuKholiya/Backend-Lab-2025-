const fs = require("fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello, World!", "utf8");

writeStream.end(); // End the stream

writeStream.on("finish", () => {
  console.log("Data written successfully to output.txt");
});

writeStream.on("error", err => {
  console.error("Error writing to file:", err.message);
});
