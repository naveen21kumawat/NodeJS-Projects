const requestHandler = (req,res)=>{
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Calculator</title></head>");
    res.write("<body>");
    res.write('<form action="/result" method="post">');
    res.write(
      '<input type="number" name="num1" placeholder="Enter first number">'
    );
    res.write(
      '<input type="number" name="num2" placeholder="Enter second number"> '
    );
    res.write('<button type="submit">Sum</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
}
module.exports = requestHandler;