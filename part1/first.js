const fs = require('fs');

const readableStream = fs.createReadStream('./text.txt', { encoding: 'utf-8',highWaterMark: 1024 });

readableStream.on('data', (chunk) => {
  console.log('Chunk:', chunk);
});

readableStream.on('end', () => {
  console.log('Finished reading file');
});