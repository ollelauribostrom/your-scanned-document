function getFrom(headers) {
  const [from] = headers.filter(header => header.name === 'From');
  return from.value.match('<(.*)>')[1].trim();
}

module.exports = getFrom;
