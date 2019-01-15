const path = require('path');

function getGmailConfig() {
  return {
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    tokenPath: path.resolve('./env/token.json'),
    historyPath: path.resolve('./env/history.json'),
    credentialsPath: path.resolve('./env/gmail-credentials.json'),
    pubsubOptions: {
      keyFilename: path.resolve('./env/service-credentials.json'),
      projectId: 'your-scanned-doc-1547418741445',
      topicName: 'projects/your-scanned-doc-1547418741445/topics/gmail',
      subscriptionName: 'projects/your-scanned-doc-1547418741445/subscriptions/email-sub',
    },
  };
}

module.exports = getGmailConfig;
