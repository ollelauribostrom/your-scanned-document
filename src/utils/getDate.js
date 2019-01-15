function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = formatMonth(now.getMonth());
  const date = now.getDate();
  return `${year}-${month}-${date}`;
}

function formatMonth(month) {
  if (month < 10) {
    return `0${month + 1}`;
  }
  return `${month + 1}`;
}

module.exports = getDate;
