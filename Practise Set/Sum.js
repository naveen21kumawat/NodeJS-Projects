const sumRequestHandler = (req,res)=>{
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Result</h1>");
  const Data = [];
  req.on("data", (chunk) => {
    console.log(chunk);
    Data.push(chunk);
  });
  req.on("end", () => {
    const parseData = Buffer.concat(Data).toString();
    console.log(parseData);
    const param = new URLSearchParams(parseData);
    const dataObject = Object.fromEntries(param);
    console.log("Data" , dataObject)
    const result = parseInt(dataObject.num1) +parseInt(dataObject.num2);
    res.write(`<h2>Sum : ${result} </h2>`)
  });
}
exports.sumRequestHandler = sumRequestHandler;
