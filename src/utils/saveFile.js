const fs = require('fs');
const path = require('path');

function saveFile(attachment) {
  return new Promise((resolve, reject) => {
    const outputBuffer = Buffer.from(attachment.data.data, 'base64');
    const outputPath = path.join(attachment.outputDir, attachment.filename);
    fs.writeFile(outputPath, outputBuffer, err => {
      if (err) {
        return reject(err);
      }
      return resolve({
        size: attachment.data.size,
        path: outputPath,
        format: path.extname(outputPath),
        title: path.basename(outputPath, path.extname(outputPath)),
        alt: "Scanned document"
      });
    })
  })
}

module.exports = saveFile;
