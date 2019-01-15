const fs = require('fs');

function get(historyPath) {
  return new Promise((resolve) => {
    fs.readFile(historyPath, (err, data) => {
      if (err) {
        return resolve(null);
      }
      const history = JSON.parse(data);
      return resolve(history.id);
    });
  });
}

function set(id, historyPath) {
  return new Promise((resolve, reject) => {
    fs.writeFile(historyPath, JSON.stringify({ id }), 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}


module.exports = { get, set };
