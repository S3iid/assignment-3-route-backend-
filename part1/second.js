const fs = require('fs');

const readStream = fs.createReadStream('./source.txt');
const writeStream = fs.createWriteStream('./dest.txt');

readStream.on('data', (chunk) => {
  writeStream.write(chunk);
});

readStream.on('end', () => {
  writeStream.end();
  console.log('File copied using streams');
});