const rescue = require('express-rescue');

const readFileTalker = require('../../utils/readFileTalker');

const getAllTalker = rescue(async (_req, res, _next) => {
    const dataTalker = await readFileTalker();
    res.status(200).json(dataTalker);
});

module.exports = getAllTalker;
