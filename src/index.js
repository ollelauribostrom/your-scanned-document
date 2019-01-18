const path = require('path');
const env = require('dotenv');

const Gmail = require('./Gmail');
const DatoCMS = require('./DatoCMS');
const saveFileTo = require('./utils/saveFileTo');
const removeFileFrom = require('./utils/removeFileFrom');
const createTmpDirectory = require('./utils/createTmpDirectory');
const getGmailConfig = require('./utils/getGmailConfig');
const logger = require('./utils/logger');

env.load({ path: path.resolve('./env', '.env') });

const gmailConfig = getGmailConfig();
const gmail = new Gmail(gmailConfig);
const cms = new DatoCMS({ apiKey: process.env.DATO_CMS_APIKEY });
const tmpDir = createTmpDirectory();
const saveFile = saveFileTo(tmpDir);
const removeFile = removeFileFrom(tmpDir);

async function run() {
  try {
    await gmail.watch(onMail);
    logger.info('Watching gmail for new emails');
  } catch (err) {
    logger.error(err);
  }
}

async function onMail(err, mail) {
  try {
    if (err) {
      throw err;
    }
    logger.info('Email received');
    if (mail.attachments.length > 0) {
      await cms.postWorkItem({
        title: await cms.getNextScanTitle(),
        description: 'This item was scanned and automatically uploaded using a Xerox Multifunction Printer',
        category: 'scanned-documents',
        files: await Promise.all(mail.attachments.map(saveFile)),
      });
      await Promise.all(mail.attachments.map(removeFile));
      logger.info('Attachment(s) saved to DatoCMS');
      await cms.deploy();
      logger.info('Site deployed\n');
    }
  } catch (error) {
    logger.error(error);
  }
}

if (process.env.NODE_ENV !== 'test') {
  run();
}

module.exports = { run, onMail };
