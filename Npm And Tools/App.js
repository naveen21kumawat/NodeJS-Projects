const http = require('http');

const server = http.createServer((res ,req)=>{
  console.log("This is a Software")
;})

server.listen(2001, ()=>{
  console.log("Listen on 2001")
})