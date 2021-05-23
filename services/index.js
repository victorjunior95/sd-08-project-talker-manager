const fs = require('fs');

function kombi() {
  return JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
 }

 function validateData(data) {
  // https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
  const urlRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  const re = urlRegex;
  return re.test(data);
}

module.exports = { kombi, validateData };
