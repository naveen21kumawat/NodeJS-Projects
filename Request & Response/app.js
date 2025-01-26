const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  if (req.url === '/'){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Server</title></head>");
    res.write("<body><h1>Welcome to Homepage</h1></body>");
    res.write("</html>");
    return res.end();

  }else if (req.url === '/products'){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Server</title></head>");
    res.write("<body><h1>Our Products</h1></body>");
    res.write("</html>");
    return res.end();

  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Server</title></head>");
  res.write("<body><h1>This is My First Server</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit();
});
const port = 3001;
server.listen(port, () => {
  console.log(`Server is running on address http://localhost:${port}`);
});
