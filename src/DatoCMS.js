const { SiteClient } = require('datocms-client');

const getDate = require('./utils/getDate');
const getSlug = require('./utils/getSlug');

class DatoCMS {
  constructor(config) {
    this.client = new SiteClient(config.apiKey);
    this.workItemType = '57323';
    this.deployId = '3473';
  }

  async postWorkItem(item) {
    const images = await this.uploadFiles(item.files);
    return this.client.items.create({
      title: item.title,
      description: item.description,
      category: await this.getCategoryId(item.category),
      images,
      featuredImage: images[0],
      date: getDate(),
      itemType: this.workItemType,
      slug: getSlug(item.title),
    });
  }

  async uploadFiles(files) {
    return Promise.all(files.map(file => this.client.uploadFile(file.path)));
  }

  async getWorkItems() {
    return this.client.items.all({
      'filter[type]': this.workItemType,
    });
  }

  async getCategoryId(slug) {
    const [category] = await this.client.items.all({
      'filter[type]': '57351',
      'filter[query]': slug,
    });
    return category.id;
  }

  async getNextScanTitle() {
    const workItems = await this.client.items.all({
      'filter[type]': this.workItemType,
    });
    const scannedItems = workItems.filter(item => item.category === '620944');
    const nextId = scannedItems.length + 1;
    return `Scanned document #${nextId}`;
  }

  async deploy() {
    return this.client.deploymentEnvironments.trigger(this.deployId);
  }
}

module.exports = DatoCMS;
