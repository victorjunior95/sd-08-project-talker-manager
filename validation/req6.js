const fs = require('fs');
const talkers = require('../helpers/talkers');

const content = talkers();

const req6 = (req, res, next) => {
  const este = content.find((obj) => obj.id === +req.params.id);
  console.log(este);
  const arr = content.pop(este);
   
   fs.writeFileSync('./talker.json', JSON.stringify(arr));
   
  next(); // o retorno fica no index
 };

 module.exports = req6;
