const fs = require('fs');
const talkers = require('../helpers/talkers');
// variaveis contendo valores uteis
const content = talkers();
const ids = [];

function preencheids() {
 content.forEach((element) => { ids.push(element.id); }); 
}

preencheids();

const req5 = (req, res) => {
  const arr = [];
  const edited = [req.body];
    if (!ids.includes(+req.params.id)) {
    return (res.status(404).send({ message: 'Pessoa palestrante não encontrada' })); 
  } 
     arr.push(content.find((obj) => obj.id === +req.params.id));
     arr.push(...edited); 
     
   let te = Object.entries(edited[0]);
   te.splice(1, 0, ['id', 5]);
   te = Object.fromEntries(te);
   edited.splice(0, 1, te);
   edited.push(...(JSON.parse(fs.readFileSync('./talker.json'))));

   fs.writeFileSync('./talker.json', JSON.stringify(edited));
   console.log(edited);
    res.status(200).json(edited[0]);
 };

 module.exports = req5;
