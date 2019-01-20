function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = zeroPad(now.getMonth() + 1);
  const date = zeroPad(now.getDate());
  return `${year}-${month}-${date}`;
}

function zeroPad(value) {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
}

module.exports = getDate;
