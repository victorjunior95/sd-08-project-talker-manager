const fs = require('fs');
const rescue = require('express-rescue');

const arquivo = fs.readFileSync('talker.json', 'utf8');

module.exports = rescue(async (req, res) => {
    const file = await arquivo;
    if (file.length === 0) return res.status(200).json([]);
    return res.status(200).json(JSON.parse(file));
});