const fs = require('fs');

// variaveis contendo valores uteis
const content = JSON.parse(fs.readFileSync('./talker.json'));
const ids = [];

function preencheids() {
 content.forEach((element) => { ids.push(element.id); }); 
}

preencheids();

const req2 = (req, res) => {
  if (!ids.includes(+req.params.id)) {
    return (res.status(404).send({ message: 'Pessoa palestrante não encontrada' })); 
  } 
    return (res.status(200).send(content.find((obj) => obj.id === +req.params.id)));
 };

 module.exports = req2;