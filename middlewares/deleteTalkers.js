const readeTalker = require('../services/readTalker');
const writeTalker = require('../services/writeTalker');

module.exports = async (req, res) => {
    const reqId = req.params.id;
    // console.log(reqId);
    const talkers = await readeTalker();
    // console.log(talkers);
    const talk = talkers.findIndex(({ id }) => Number(id) === Number(reqId));
    // console.log(talk);

    if (talk === -1) {
        return null;
    }

    talkers.splice(talk, 1);
    await writeTalker(talkers);
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};