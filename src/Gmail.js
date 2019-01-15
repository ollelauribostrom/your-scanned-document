const { google } = require('googleapis');
const { PubSub } = require('@google-cloud/pubsub');

const getGmailToken = require('./utils/getGmailToken');
const getGmailCredentials = require('./utils/getGmailCredentials');
const lastHistoryId = require('./utils/lastHistoryId');

class Gmail {
  constructor(options) {
    this.scope = options.scope;
    this.tokenPath = options.tokenPath;
    this.credentialsPath = options.credentialsPath;
    this.historyPath = options.historyPath;
    this.pubsubOptions = options.pubsubOptions;
  }

  async init() {
    const {
      clientId,
      clientSecret,
      redirectUris,
    } = await getGmailCredentials(this.credentialsPath);
    const auth = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);
    const token = await getGmailToken(auth, this.scope, this.tokenPath);
    this.lastHistoryId = await lastHistoryId.load(this.historyPath);
    this.gmail = google.gmail({ version: 'v1', auth });
    auth.setCredentials(token);
  }

  async watch(onMessage) {
    const {
      projectId,
      keyFilename,
      topicName,
      subscriptionName,
    } = this.pubsubOptions;
    await this.init();
    await this.gmail.users.watch({ userId: 'me', resource: { topicName } });
    const pubsub = new PubSub({ projectId, keyFilename });
    const subscription = pubsub.subscription(subscriptionName);
    subscription.on('message', message => this.parseMessage(message, onMessage));
    setTimeout(() => this.watch(), 1000 * 60 * 60 * 24);
  }

  async getHistory(startHistoryId) {
    return this.gmail.users.history.list({
      userId: 'me',
      startHistoryId,
    });
  }

  async getMessage(id) {
    return this.gmail.users.messages.get({
      userId: 'me',
      id,
    });
  }

  async getAttachment(id, filename, messageId) {
    const { data } = await this.gmail.users.messages.attachments.get({
      id,
      messageId,
      userId: 'me',
    });
    return { data, filename };
  }

  async setLastHistoryId(id) {
    this.lastHistoryId = id;
    return lastHistoryId.save(id, this.historyPath);
  }

  async parseMessage(message, onMessage) {
    try {
      message.ack();
      const messageData = JSON.parse(message.data);
      if (!this.lastHistoryId) {
        await this.setLastHistoryId(messageData.historyId);
        return;
      }
      const history = await this.getHistory(this.lastHistoryId);
      const { id } = history.data.history[0].messages[0];
      const { data } = await this.getMessage(id);
      const attachments = await Promise.all(
        data.payload.parts
          .filter(({ filename }) => filename && filename.length > 0)
          .map(({ body, filename }) => this.getAttachment(body.attachmentId, filename, id)),
      );
      await this.setLastHistoryId(messageData.historyId);
      onMessage(null, { id, data, attachments });
    } catch (err) {
      onMessage(err);
    }
  }
}

module.exports = Gmail;
