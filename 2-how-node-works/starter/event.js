const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There is an emitter new Sale!");
});
myEmitter.on("newSale", (param) => {
  console.log("There is a new Sale with param:", param);
});

myEmitter.emit("newSale", 9);

///////////////////////
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request received !!");
  res.end("Request received !!");
});
server.on("request", (req, res) => {
  res.end("Another Request !!");
});
server.on("request", (req, res) => {
  res.end("Third Request !!");
});

server.on("close", () => {
  console.log("Server was closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
