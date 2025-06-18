const express = require('express');
const app = express();



app.use((req,res,next)=>{
  console.log('Hello, World 1',req.url);
  next();
})
app.use((req,res,next)=>{
  console.log('Hello, World 2',req.url);
  next();
})

app.get('/',(req, res,next) => {
  res.send(' main page' );
});
app.get('/pro',(req, res,next) => {
  return next(new Error('Not Implemented'));
});

app.use((req, res, err) => { 
  console.error('Error occurred:', err);
  // console.log('Hello, World 3', req.url);
  res.status(404).send('Page not found 2');
});
app.listen(3001);