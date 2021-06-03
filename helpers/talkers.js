const fs = require('fs');
// conteudo de talker .json
module.exports = function talkers() {
   return JSON.parse(fs.readFileSync('./talker.json')); 
};
