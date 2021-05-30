const fs = require('fs');
const rescue = require('express-rescue');
const talk = require('../talker.json');

const createTalker = rescue(async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const newFile = { name, age, talk: { watchedAt, rate } };
    console.log('n');
    const file = talk;
    const id = Math.max(...talk.map((element) => element.id)) + 1;
    const newTalker = { id, ...newFile };
    file.push(newTalker);
    const newResult = JSON.stringify(file, null, 2);
    fs.writeFileSync('talker.json', newResult, 'utf-8'); 
    res.status(201).json(newTalker);
});

module.exports = createTalker;