const fs = require('fs');

function getGmailCredentials(credentialsPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(credentialsPath, (err, content) => {
      if (err) {
        return reject(err);
      }
      const credentials = JSON.parse(content);
      return resolve(credentials.installed)
    })
  })
}

module.exports = getGmailCredentials;
