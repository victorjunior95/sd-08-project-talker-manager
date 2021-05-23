const fs = require('fs');
const rescue = require('express-rescue');

const arquivo = fs.readFileSync('talker.json', 'utf8');

module.exports = rescue(async (req, res) => {
    const file = await arquivo;
    if (file) return res.status(200).json(JSON.parse(file));    
    return res.status(200).json([]);
});