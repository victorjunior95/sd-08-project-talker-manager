const fs = require('fs');
const rescue = require('express-rescue');
const talk = require('../talker.json');

const createTalker = rescue(async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const newFile = { name, age, talk: { watchedAt, rate } };
    
    const file = await JSON.parse(talk);
    const id = { id: 1 };
    const newTalker = Object.assign(id, newFile);
    file.push(newTalker);
    const newResult = await JSON.stringify(file, null, 2);
    fs.writeFile('talker.json', newResult, 'utf-8', async (err) => {
         if (err) throw err;
         res.status(201).json(newTalker);
    });
});

module.exports = createTalker;