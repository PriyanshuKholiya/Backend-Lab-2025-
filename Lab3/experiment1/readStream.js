const { createReadStream } = require("fs");

const readStream = createReadStream("data.txt", {
  encoding: "utf8",
  highWaterMark: 20   // 20 bytes per chunk
});

let chunkCount = 0;
readStream.on("data", (chunk) => {
  chunkCount++;
  console.log(`Reading chunk #${chunkCount}:`, JSON.stringify(chunk));
});

readStream.on("end", () => console.log("Finished reading file."));

