const fs = require('fs');
const rescue = require('express-rescue');

const getAll = rescue(async (req, res) => {
    fs.readFile('talker.json', 'utf8', async (err, data) => {
        if (err) {
            return res.status(200).json([]);
        } 
            return res.status(200).json(JSON.parse(data));
    });
});

module.exports = getAll; 