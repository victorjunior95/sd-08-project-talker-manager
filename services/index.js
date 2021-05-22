const fs = require('fs');

function kombi() {
  return JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
 // return 'ops';
 }

module.exports = { kombi };
