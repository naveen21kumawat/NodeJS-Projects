const sumRequestHandler = (req,res)=>{
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>Result</h1>");
  console.log('1 - In Sum Request handler',req.url);
  const Data = [];
  let result;
  req.on("data", (chunk) => {
    console.log(chunk);
    Data.push(chunk);
  console.log('2 - Chunk Come',req.url);
  });
  req.on("end", () => {
    console.log( " 3 - end event caame")
    const parseData = Buffer.concat(Data).toString();
    console.log(parseData);
    const param = new URLSearchParams(parseData);
    console.log("Param" , param)
    const dataObject = Object.fromEntries(param);
    console.log("Data" , dataObject)
     result = parseInt(dataObject.num1) +parseInt(dataObject.num2);
  });
  console.log("4 - sending the response")
  res.write(`<h2>Sum : ${result} </h2>`)
  return res.end();
}
exports.sumRequestHandler = sumRequestHandler;
