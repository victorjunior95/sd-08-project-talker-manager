const fs = require('fs');
const rescue = require('express-rescue');
const talk = require('../talker.json');

const createTalker = rescue(async (req, res) => {   
    const file = talk;
    const newTalker = { id: file.length + 1, ...req.body };
    const talkers = file.concat(newTalker);  
    const newResult = JSON.stringify(talkers, null, 2);
    fs.writeFileSync('talker.json', newResult, 'utf-8'); 
    res.status(201).json(newTalker);
});

module.exports = createTalker;