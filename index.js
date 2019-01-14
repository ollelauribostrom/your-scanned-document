const env = require('dotenv');
const Gmail = require('./src/Gmail');
const DatoCms = require('./src/DatoCms');

env.load();

const gmail = new Gmail()
const cms = new DatoCms({ apiKey: process.env.DATO_CMS_APIKEY });

gmail.init()
  .then(() => gmail.watch())
  .catch(err => console.log(err));