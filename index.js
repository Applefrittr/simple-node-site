const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("./index.html", (err, data) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else {
    fs.readFile(`.${req.url}.html`, (err, data) => {
      if (!err && data) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      } else {
        fs.readFile("./404.html", (err, data) => {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        });
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
