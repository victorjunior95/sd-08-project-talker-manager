const readTalker = require('../services/readTalker');
const writeTalker = require('../services/writeTalker');

module.exports = async (req, res, _next) => {
    const { name, age, talk } = req.body;
    const talker = await readTalker();

    const newTalker = {
        name,
        age,
        id: talker.length + 1,
        talk: {
            watchedAt: talk.watchedAt,
            rate: talk.rate,
        },
    };

    talker.push(newTalker);
    await writeTalker(talker);
    return res.status(201).json(newTalker);
};