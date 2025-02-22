const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

app.use((req ,res)=>{
  console.log('Hello World');
  res.json({
    message: 'Hello World',
    
  })
})
const PORT = 3005;

server.listen(PORT , ()=>{
  console.log(`Server is running on port ${PORT}`);
})