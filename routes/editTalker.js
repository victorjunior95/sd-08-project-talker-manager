const fs = require('fs');
const rescue = require('express-rescue');

const talk = require('../talker.json');

const editTalker = rescue(async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) {
        return res.status(401)
        .json({ message: 'Token inválido' }); 
    }       
    const file = talk;
    const talkersWithoutId = file.filter((talker) => talker.id !== Number(id));

  const updateTalker = {
    id: Number(id),
    ...req.body,
  };
  const updatedTalker = talkersWithoutId.concat(updateTalker);
    const newResult = JSON.stringify(updatedTalker, null, 2);
    fs.writeFileSync('talker.json', newResult, 'utf-8'); 
    res.status(200).json(updateTalker);    
});   

module.exports = editTalker;
