const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const readFileTalker = require('../../utils/readFileTalker');

const getTalkerById = rescue(async (req, res) => {
    const { id } = req.params;
    const dataTalkers = await readFileTalker();
    const findTalker = dataTalkers.find((talker) => talker.id === +id);
    if (!findTalker) {
      throw boom.notFound('Pessoa palestrante não encontrada');
    } 
    res.status(200).send(findTalker);
});

module.exports = getTalkerById;
