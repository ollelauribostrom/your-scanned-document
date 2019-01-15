const fs = require('fs');
const path = require('path');

function saveFileTo(outputDir) {
  return function saveFile(file) {
    return new Promise((resolve, reject) => {
      const outputBuffer = Buffer.from(file.data.data, 'base64');
      const outputPath = path.join(outputDir, file.filename);
      fs.writeFile(outputPath, outputBuffer, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          size: file.data.size,
          path: outputPath,
          format: path.extname(outputPath),
          title: path.basename(outputPath, path.extname(outputPath)),
          alt: 'Scanned document',
        });
      });
    });
  };
}

module.exports = saveFileTo;
