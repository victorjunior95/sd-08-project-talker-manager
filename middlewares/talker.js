const arquivo = require('../talker.json');

module.exports = (req, res) => {
    if (arquivo.length === 0) return res.status(200).json([]);
    return res.status(200).json(arquivo);
};
