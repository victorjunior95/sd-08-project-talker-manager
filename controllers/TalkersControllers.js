const fs = require('fs');

module.exports = { 
  index(_request, response) {
    const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
    
    response.status(200).json(talkers);
  },

  search(request, response) {
    const { query } = request.query;
    const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
    const search = talkers.filter(({ name }) => name.includes(query));

    if (search) {
      response.status(200).json(search);
    }

    response.status(200).json(talkers);
  },

  id(request, response) {
    const { id: requestId } = request.params;
    const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
    const talkerById = talkers.find(({ id }) => id === Number(requestId));

    if (talkerById) {
      response.status(200).json(talkerById);
    }

    response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  },

  create(request, response) {
    const createTalker = request.body;
    const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));

    createTalker.id = talkers.length + 1;
    talkers.push(createTalker);
    fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(talkers));
    
    response.status(201).json(createTalker);
  },

  update(request, response) {
    const { id } = request.params;
    const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));

    talkers[id - 1] = { id: Number(id), ...request.body };
    fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(talkers));

    response.status(200).json(talkers[id - 1]);
  },

  delete(request, response) {
    const { id } = request.params;

    const numId = Number(id);
    const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
    const index = numId - 1;

    talkers.splice(index, 1);
    fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(talkers));

    response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  },
};