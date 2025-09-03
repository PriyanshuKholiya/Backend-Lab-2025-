const fs = require("fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello, World!");

writeStream.end(); 

writeStream.on("finish", () => {
  console.log("Data written successfully to output.txt");
});

writeStream.on("error", err => {
  console.error("Error writing to file:", err.message);
});

//verifying the output using readFile 
 fs.readFile("output.txt", "utf8",(err, data) => {
    if (err) {
      console.error("Error reading file:", err.message);
      return;
    }
    console.log("Verified file content:", data);
  });


