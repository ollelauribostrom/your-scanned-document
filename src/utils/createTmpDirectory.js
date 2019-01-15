const fs = require('fs');
const path = require('path');
const os = require('os');

function createTmpDirectory() {
  const tmpDir = os.tmpdir();
  return fs.mkdtempSync(`${tmpDir}${path.sep}`);
}

module.exports = createTmpDirectory;
