const arquivo = require('../talker.json');

module.exports = (req, res) => {
    if (!arquivo) return res.status(200).json([]);
    return res.status(200).json(arquivo);
};
