function getSlug(title) {
  return title
    .split(' ')
    .join('-')
    .replace('#', '')
    .toLowerCase();
}

module.exports = getSlug;
