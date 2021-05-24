const readSync = require('./helpers/readSync');

function getById(req, res) {
  const { id } = req.params;
  const idNumber = Number(id);
  const errorMessage = readSync('./errorMessage.json');
  const file = readSync('./talker.json');
  const personById = file.filter((item) => item.id === idNumber);

  if (personById.length > 0) {
    res.status(200).send(file[0]);
  } else {
    res.status(404).send(errorMessage);
  } 
}

module.exports = getById;
