const fs = require('fs').promises;
// const talkersData = require('../talker.json');

module.exports = async (request, response) => {
  const allTalkers = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8')
    .then((res) => JSON.parse(res))
    .catch((err) => console.log(err));
  const talker = request.body;
  const newTalker = {
    id: allTalkers[allTalkers.length - 1].id + 1,
    ...talker,
  };
  allTalkers.push(newTalker);
  await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  return response.status(201).json(newTalker);
    // .catch((err) => console.log(err));
};
