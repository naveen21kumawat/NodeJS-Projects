const fs = require('fs');

// fs.writeFile('example.txt', 'Hello, World!', (err) => {
//   if (err) {
//     console.error('Error writing to file:', err);
//   } else {
//     console.log('File written successfully');
//   }
// })

// fs.appendFile('example.txt', 'Hello, World! ', (err) => {
//   if (err) {
//     console.error('Error writing to file:', err);
//   } else {
//     console.log('File written successfully');
//   }
// })

// fs.rename('example.txt', 'example2.txt', (err) => {
//   if (err) {
//     console.error('Error renaming file:', err);
//   } else {
//     console.log('File renamed successfully');
//   }
// })
// fs.copyFile('example2.txt', './copy/example3.txt', (err) => {
//   if (err) {
//     console.error('Error copying file:', err.message);
//   } else {
//     console.log('File copied successfully');
//   }
// }); 
fs.unlink('./example2.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err.message);
  } else {
    console.log('File deleted successfully');
  }
})