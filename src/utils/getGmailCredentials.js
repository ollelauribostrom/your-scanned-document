const fs = require('fs');

function getGmailCredentials(credentialsPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(credentialsPath, (err, content) => {
      if (err) {
        return reject(err);
      }
      const credentials = JSON.parse(content);
      return resolve({
        clientId: credentials.installed.client_id,
        clientSecret: credentials.installed.client_secret,
        redirectUris: credentials.installed.redirect_uris,
      });
    });
  });
}

module.exports = getGmailCredentials;
