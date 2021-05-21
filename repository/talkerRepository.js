const fs = require('fs');

const repository = () =>
  new Promise((res) => {
    const talkerRepository = JSON.parse(
      fs.readFileSync(`${__dirname}/../talker.json`, 'utf8'),
    );
    if (talkerRepository) return res(talkerRepository);
  });

module.exports = {
  findAll: () => repository().then((entity) => entity),
  findById: (id) =>
    repository()
    .then((entity) =>
      entity.find((entityId) => +id === entityId.id))
    ,
};
