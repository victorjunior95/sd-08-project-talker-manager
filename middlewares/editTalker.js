const readTalker = require('../services/readTalker');
const writeTalker = require('../services/writeTalker');

module.exports = async (req, res) => {
    const reqId = req.params.id;
    const { name, age, talk } = req.body;

    const talker = await readTalker();
    // console.log(talker);
    const modifyTalker = talker.find(({ id }) => Number(id) === Number(reqId));
    // console.log(modifyTalker);
    const edit = {
        id: Number(reqId),
        name,
        age,
        talk,
    };
    talker.splice(modifyTalker, 1, edit);
    await writeTalker(talker);
    res.status(200).json(edit);
};