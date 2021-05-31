const fs = require('fs');
// conteudo de talker .json
 const talkers = () => JSON.parse(fs.readFileSync('./talker.json'));
 module.exports = talkers;
