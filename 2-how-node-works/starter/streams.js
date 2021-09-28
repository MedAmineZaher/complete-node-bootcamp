const fs = require("fs");
const server = require("http").createServer();
let i = 0;

server.on("request", (req, res) => {
  const readable = fs.createReadStream("test-file.txt");
  //   readable.on("data", (chunk) => {
  //     i++;
  //     console.log(i);
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("file not found");
  //   });

  // sikution 3
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
