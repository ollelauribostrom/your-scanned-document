function getSlug(title) {
  return title.split(' ').join('-').toLowerCase();
}

module.exports = getSlug;
