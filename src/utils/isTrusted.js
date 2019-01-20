const fs = require('fs');

function isTrusted(from, trustListPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(trustListPath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      const trustList = JSON.parse(data);
      return resolve(trustList.includes(from.toLowerCase()));
    });
  });
}

module.exports = isTrusted;
