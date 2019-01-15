const fs = require('fs');
const path = require('path');
const os = require('os');

function createTmpDirectory() {
  return new Promise((resolve, reject) => {
    const tmpDir = os.tmpdir();
    fs.mkdtemp(`${tmpDir}${path.sep}`, (err, dir) => {
      if (err) {
        return reject(err);
      }
      return resolve(dir);
    });
  })
}

module.exports = createTmpDirectory;
