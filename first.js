const fs = require("fs")
// fs.writeFile("ou.txt","File Written ",(e)=> console.log("H"))
fs.writeFile("output.txt","Writing file success",(err) =>{  if (err) console.log("Error Uccured")
  else console.log("File written succeful")
})

console.log("Hello")