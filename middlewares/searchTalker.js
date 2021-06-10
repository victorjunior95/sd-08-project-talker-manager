const readeTalker = require('../services/readTalker');

module.exports = async (req, res) => {
    const { q } = req.query;
    const talkers = await readeTalker();

    const search = talkers.filter(({ name }) => name.includes(q));

    if (!q || q === '') {
        return res.status(200).json(talkers);
    }
    if (!search || search === []) {
        return res.status(200).json([]);
    }
    return res.status(200).json(search);
};