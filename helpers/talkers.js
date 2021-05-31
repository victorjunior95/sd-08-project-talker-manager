const fs = require('fs');
// conteudo de talker .json
 function talkers() { return JSON.parse(fs.readFileSync('./talker.json')); }
 module.exports = talkers;
