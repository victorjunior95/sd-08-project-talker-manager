const fs = require('fs').promises;
const talkersData = require('../talker.json');

module.exports = async (request, response, next) => {
  const { id } = request.params;
  const allTalkers = [...talkersData];
  const talker = request.body;
  const newTalker = {
    id,
    ...talker,
  };
  if (allTalkers.some((person) => person.id === id)) {
    const updatedTalkers = allTalkers.map((speaker) => (speaker.id === id ? newTalker : speaker));
    await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(updatedTalkers))
      .then(() => response.status(200).json(newTalker))
      .catch((err) => console.log(err));
  } else {
    next();
  }
};
