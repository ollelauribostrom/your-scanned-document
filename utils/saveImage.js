const fs = require('fs');
const path = require('path');

function saveImage(attachment) {
  console.log(attachment);
  return new Promise((resolve, reject) => {
    const outputBuffer = Buffer.from(attachment.data.data, 'base64');
    const outputPath = path.join('./tmp', attachment.filename);
    fs.writeFile(outputPath, outputBuffer, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    })
  })
}

module.exports = saveImage;
