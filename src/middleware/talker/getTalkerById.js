const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const { readDataTalkers } = require('../../utils/readDataTalkers');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
 /*  try { */
    const dataTalkers = await readDataTalkers();
    const idTalker = dataTalkers.find((talker) => talker.id === +id);
    if (!idTalker) throw boom.notFound('Pessoa palestrante não encontrada');
    res.status(200).send(idTalker);
 /*  } catch (err) {
    console.log(err);
  } */
});
