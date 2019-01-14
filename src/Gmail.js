const path = require('path');
const { google } = require('googleapis');
const { PubSub } = require('@google-cloud/pubsub');
const getGmailToken = require('../utils/getGmailToken');
const getGmailCredentials = require('../utils/getGmailCredentials');
const saveImage = require('../utils/saveImage');

class Gmail {
  constructor(options = {}) {
    this.scope = options.scope || ['https://www.googleapis.com/auth/gmail.readonly'];
    this.tokenPath = options.tokenPath || path.resolve('./data/token.json')
    this.credentialsPath = options.credentialsPath || path.resolve('./data/credentials.json');
    this.pubsub = new PubSub({
      projectId: 'your-scanned-doc-1547418741445',
      keyFilename: path.resolve('./data/service.json')
    });
    this.lastHistoryId = null;
  }

  async init() {
    const credentials = await getGmailCredentials(this.credentialsPath);
    const {client_secret, client_id, redirect_uris} = credentials;
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const token = await getGmailToken(auth, this.scope, this.tokenPath);
    auth.setCredentials(token);
    this.gmail = google.gmail({ version: 'v1', auth });
  }

  async watch() {
    const res = await this.gmail.users.watch({
      userId: 'me',
      resource: {
        topicName: 'projects/your-scanned-doc-1547418741445/topics/gmail',
      },
    });
    const subscription = this.pubsub.subscription('projects/your-scanned-doc-1547418741445/subscriptions/email-sub');
    subscription.on('message', message => this.onMessage(message))
    return res.data;
  }

  async onMessage(message) {
    message.ack();
    const data = JSON.parse(message.data);
    const history = await this.gmail.users.history.list({
      userId: 'me',
      startHistoryId: this.lastHistoryId || data.historyId
    })
    this.lastHistoryId = data.historyId;
    if (!history.data.history) {
      return;
    }
    const messageId = history.data.history[0].messages[0].id;
    const messageData = await this.gmail.users.messages.get({
      id: messageId,
      userId: 'me'
    })
    const attachments = messageData.data.payload.parts.filter(part => part.filename && part.filename.length > 0)
    const attachmentsData = await Promise.all(attachments.map(async attachment => {
      const { data } = await this.gmail.users.messages.attachments.get({
        id: attachment.body.attachmentId,
        messageId,
        userId: 'me'
      });
      return { data: data, filename: attachment.filename }
    }));
    await attachmentsData.forEach(saveImage)
  }
}

module.exports = Gmail;
