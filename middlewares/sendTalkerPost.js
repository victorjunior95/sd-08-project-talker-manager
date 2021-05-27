const rescue = require('express-rescue');
const fs = require('fs');
const data = require('../talker.json');

const sendTalkerPost = (rescue(async (request, response) => {
  const { name, age } = request.body;
  const { watchedAt, rate } = request.body.talk;
  const size = data.length;
  const nTalker = { id: size + 1, name, age, talk: { watchedAt, rate } };
  data.push(nTalker);

  try {
    await fs.promises.writeFile('talker.json', JSON.stringify(data));    
    return response.status(201).send(nTalker);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = sendTalkerPost;
