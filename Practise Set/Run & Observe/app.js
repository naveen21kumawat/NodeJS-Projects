const fs = require('fs');

console.log( " 1  - Start");
console.log( " 2  - Sync  code Reading ")
const dataSync = fs.writeFileSync('user-deatils.txt','utf8');
console.log( " 3  - Sync Read Complete")

console.log(" 4 reading file Async");
fs.readFile('user-deatils.txt', 'utf8', (err ,dataAsync)=>{
  if(err) throw err;
  console.log('6 . Async read Complete',err ,dataAsync)

});
console.log("5 End OF code")