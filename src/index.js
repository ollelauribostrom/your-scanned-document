const path = require('path');
const env = require('dotenv');
const Gmail = require('./Gmail');
const DatoCms = require('./DatoCms');

env.load({ path: path.resolve('./env', '.env') });

const gmail = new Gmail({}, onAttachment);
const cms = new DatoCms({ apiKey: process.env.DATO_CMS_APIKEY });

gmail.init()
  .then(() => gmail.watch())
  .catch(err => console.log(err));

async function onAttachment(attachment) {
  return cms.postWorkItem({
    title: await cms.getNextScanTitle(),
    description: 'This item was scanned and automatically uploaded',
    category: 'scanned',
    files: attachment,
  });
}
