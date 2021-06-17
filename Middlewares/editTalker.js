const fs = require('fs').promises;
const { talkers } = require('../Helpers');

const editTalker = async (req, res) => {
  const talkersData = talkers();
  const { params, body } = req;
  const { id } = params;
  const { name, age, talk } = body;
  talkersData[id - 1] = {
    id: Number(id),
    name,
    age: Number(age),
    talk: {
      watchedAt: talk.watchedAt,
      rate: Number(talk.rate),
    },
  };
  console.log(talkersData[id - 1]);
  fs.writeFile('./talker.json', JSON.stringify(talkersData)); 
  return res.status(200).send(talkersData[id - 1]);
};

module.exports = editTalker;
