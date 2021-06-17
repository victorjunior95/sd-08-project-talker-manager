const fs = require('fs');
const getTalkers = require('./services/getTalkers');
const { validateName, validateAge, validateTalk } = require('./middlewares/validations');

const editTalker = (idToEdit, talkerToEdit) => {
  const currTalkers = getTalkers();
  const talkerReady = talkerToEdit;
  talkerReady.id = idToEdit;
  currTalkers[idToEdit - 1] = talkerToEdit;
  fs.writeFileSync('./talker.json', JSON.stringify(currTalkers), 'utf-8');
  return talkerToEdit;
};

module.exports = (req, res) => {
  try {
    const { id } = req.params;
    const talkerToEdit = req.body;
    const { name, age, talk } = talkerToEdit;
    validateName(name, res);
    validateAge(age, res);
    validateTalk(talk, res);

    const talkerEdited = editTalker(Number(id), talkerToEdit);
    return res.status(200).send({ ...talkerEdited });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
