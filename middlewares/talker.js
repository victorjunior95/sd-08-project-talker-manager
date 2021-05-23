const fs = require('fs');

const arquivo = fs.readFileSync('talker.json', 'utf8');

module.exports = (req, res) => {
    if (arquivo.length === 0) return res.status(200).json([]);
    return res.status(200).json(JSON.parse(arquivo));
};