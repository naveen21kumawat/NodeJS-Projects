import { createServer } from "http";
// import fs from "fs";

const server = createServer((req, res) => {
  if (req.url === "/home") {
    res.write("<h1>Welcome to Home</h1>")
   return res.end();
  }else if (req.url === "/men") {
    res.write("<h1>Welcome to Men</h1>")
   return res.end();
  }
  else if (req.url === "/women") {
    res.write("<h1>Welcome to Women</h1>")
   return res.end();
  }else if (req.url === "/kids") {
    res.write("<h1>Welcome to Kids</h1>")
   return res.end();
  }
  res.write(`<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/men">Men</a></li> 
      <li><a href="/women">Women</a></li> 
      <li><a href="/kids">Kids</a></li>
    </ul>
  </nav>
</body>
</html>`);
  return res.end();
});

const port = 3003;
server.listen(port, () => {
  console.log(`Server is running on address http://localhost:${port}`);
});
