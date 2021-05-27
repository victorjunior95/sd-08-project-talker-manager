const rescue = require('express-rescue');
const fs = require('fs');
const data = require('../talker.json');

const sendTalkerPut = (rescue(async (request, response) => {
  const { id } = request.params;
  const { name, age } = request.body;
  const { watchedAt, rate } = request.body.talk;
  const nTalker = { id: +id, name, age, talk: { watchedAt, rate } };
  data[id - 1] = nTalker;

  try {
    await fs.promises.writeFile(`${__dirname}/../talker.json`, JSON.stringify(data));    
    response.status(200).send(nTalker);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = sendTalkerPut;
