const fs = require('fs');

const nomeDoArquivo = 'talker.json';

const createTalker = (body) => {
  const file = fs.readFileSync(nomeDoArquivo);
  const newId = file.length + 1;
  return {
    id: newId,
    name: body.name,
    age: body.age,
    talk: {
      watchedAt: body.talk.watchedAt,
      rate: body.talk.rate,
    },
  };
};

module.exports = createTalker;