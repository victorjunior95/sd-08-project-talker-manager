const talkers = require('./talkers');

function preencheids() {
  const ids = [];
  talkers().forEach((element) => { ids.push(element.id); }); 
  return ids;
 }

 module.exports = preencheids;