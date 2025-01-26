const http = require("http");
// function requestListener(req, res) {
//   console.log(req);
// }

const server = http.createServer((req, res) => {
  console.log(req.url ,req.method, req.headers);
  // process.exit();
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on address http://localhost:${port}`);
});
