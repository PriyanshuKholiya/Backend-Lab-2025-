const fs = require("fs");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

// Step 1: Handle data chunks manually
readStream.on("data", (chunk) => {
  const canWrite = writeStream.write(chunk); // write chunk to output

  // Step 2: Handle backpressure
  if (!canWrite) {
    // pause reading if write buffer is full
    readStream.pause();

    // resume when drain event fires
    writeStream.once("drain", () => {
      readStream.resume();
    });
  }
});

// Step 3: End writeStream when reading finishes
readStream.on("end", () => {
  writeStream.end();
  console.log("File copied manually!");
});

// Step 4: Handle errors
readStream.on("error", (err) => {
  console.error("Error reading file:", err.message);
});
writeStream.on("error", (err) => {
  console.error("Error writing file:", err.message);
});
