const fs = require('fs').promises;
const talkersData = require('../talker.json');

module.exports = async (request, response, next) => {
  const { id } = request.params;
  const newId = parseInt(id, 10);
  const allTalkers = [...talkersData];
  const talker = request.body;
  const newTalker = { id: newId, ...talker };
  const updatedTalkers = allTalkers.map((speaker) => {
    if (speaker.id === newId) return newTalker;
    return speaker;
  });
  await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(updatedTalkers))
  .then(() => response.status(200).json(newTalker))
  .catch((err) => console.log(err));
  next();
};
