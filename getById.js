const readSync = require('./helpers/readSync');

function getById(req, res) {
  const { id } = req.params;
  const idNumber = Number(id);
  const file = readSync('./talker.json');
  const personById = file.find((item) => item.id === idNumber);

  if (personById) {
    res.status(200).send(personById);
  } else {
    res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } 
}

module.exports = getById;
