const fs = require('fs');
const path = require('path');

function removeFileFrom(directory) {
  return function removeFile(file) {
    return new Promise((resolve, reject) => {
      const unlinkPath = path.join(directory, file.filename);
      fs.unlink(unlinkPath, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  };
}

module.exports = removeFileFrom;
