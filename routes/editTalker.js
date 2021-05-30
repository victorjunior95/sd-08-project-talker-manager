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
    const talkerId = file.filter((talker) => talker.id !== Number(id));

    const updateTalker = { id: Number(id), ...req.body };
    const newUpdate = talkerId.concat(updateTalker);
    const result = JSON.stringify(newUpdate, null, 2);
    fs.writeFileSync('talker.json', result, 'utf-8'); 
    res.status(200).json(updateTalker);    
});   

module.exports = editTalker;
