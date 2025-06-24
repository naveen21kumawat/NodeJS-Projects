const http = require("http");
const calReq = require('./Calculator')
const server = http.createServer(calReq);
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});