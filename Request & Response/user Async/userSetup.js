const http = require("http");
const userRequest = require('./user')
const server = http.createServer(userRequest);


const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on address http://localhost:${port}`);
});