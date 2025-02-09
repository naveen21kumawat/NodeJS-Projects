const fs = require("fs");
const { json } = require("stream/consumers");

const userRequestHandler =(req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Server</title></head>");
    res.write("<body><h1>Enter Your Details</h1><br>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" name="username" placeholder="Enter Your Name" /><br><br>'
    );
    res.write('<label for="male">Male</label>');
    res.write(
      '<input type="radio" id="male" name="gender" value="male" /><br><br>'
    );
    res.write('<label for="female">Female</label>');
    res.write(
      '<input type="radio" id="female" name="gender" value="female" /><br><br>'
    );
    res.write('<input type="submit" value="submit" />');

    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    const body = [];
    req.on('data' , chunk  => {
      console.log(chunk)
      body.push(chunk);
    })
    req.on('end', () => {
       const parsedBody = Buffer.concat(body).toString();
       console.log(parsedBody);
       const param =new URLSearchParams(parsedBody);
      //  const bodyObject = {};
      //  for (const [key, value] of param.entries()) {
      //   bodyObject[key] = value;
        
      //  }
      const bodyObject = Object.fromEntries(param);
       console.log(bodyObject);
       fs.writeFile("user.txt", JSON.stringify(bodyObject), error => console.log("Data Sent ",error));
      })
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Server</title></head>");
  res.write("<body><h1>Data Send Successfully</h1></body>");
  res.write("</html>");
  return res.end();
  // process.exit();
};
module.exports = userRequestHandler;

