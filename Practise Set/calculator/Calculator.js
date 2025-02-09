const { sumRequestHandler } = require("./Sum");
const  requestHandler  = require("./Handler");
const CalcultorFile = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Contenet-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome</title></head>");
    res.write("<body>");

    res.write("<h1>Welcome</h1>");
    res.write('<form action="/calculator" method="post">');
    res.write('<button type="submit">Calculator</button>');
    res.write("</form>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/calculator") {
    return requestHandler(req,res);
  } else if (req.url === "/result" && req.method == "POST") {
   return sumRequestHandler(req,res);
  }
};

module.exports = CalcultorFile;
