
const fs = require('fs');
const readline = require('readline');

function getGmailToken(oAuth2Client, scope, tokenPath) {
  return new Promise((resolve) => {
    fs.readFile(tokenPath, (err, token) => {
      if (err) {
        return getNewToken(oAuth2Client, scope, tokenPath);
      }
      return resolve(JSON.parse(token));
    });
  });
}

function getNewToken(oAuth2Client, scope, tokenPath) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
    });
    console.log(`Authorize this app by visiting this url: ${authUrl}`);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          reject(err);
        }
        saveToken(token, tokenPath)
          .then(() => resolve(token))
          .catch(tokenError => reject(tokenError));
      });
    });
  });
}

function saveToken(token, tokenPath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
      if (err) {
        return reject(err);
      }
      console.log(`Token saved to: ${tokenPath}`);
      return resolve();
    });
  });
}

module.exports = getGmailToken;
