const rescue = require('express-rescue');
const fs = require('fs');

const sendTalkerPost = (rescue(async (request, response) => {
  const data = JSON.parse(fs.readFileSync('talker.json'));
  const { name, age, talk } = request.body;
  // const { watchedAt, rate } = request.body.talk;
  const size = data.length;
  const nTalker = { id: size + 1, name, age: +age, talk };
  data.push(nTalker);

  try {
    await fs.promises.writeFile(`${__dirname}/../talker.json`, JSON.stringify(data));    
    response.status(201).send(nTalker);
  } catch (error) {
    throw new Error(error);
  }
}));

module.exports = sendTalkerPost;
