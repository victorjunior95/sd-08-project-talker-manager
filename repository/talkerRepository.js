const fs = require('fs');

const loadRepository = () =>
  new Promise((res) => {
    const talkerRepository = JSON.parse(
      fs.readFileSync(`${__dirname}/../talker.json`, 'utf8'),
    );
    if (talkerRepository) return res(talkerRepository);
  });

const saveRepository = (entry) =>
  new Promise((res) => {
    const talkerRepository = fs.writeFileSync(
      `${__dirname}/../talker.json`,
      JSON.stringify(entry),
      'utf8',
    );
    if (talkerRepository) return res(talkerRepository);
  });

const idGenerator = () =>
  new Promise((res) => {
    const memory = JSON.parse(
      fs.readFileSync(`${__dirname}/memoryId.txt`, 'utf8'),
    );
    if (memory) {
      fs.writeFileSync(
        `${__dirname}/memoryId.txt`,
        JSON.stringify(+memory + 1),
        'utf8',
      );
      return res(memory);
    }
  });

const findAll = (entity) => entity;

const findById = (id) =>
  loadRepository().then((entity) =>
    entity.find((entityId) => +id === entityId.id));

const save = async (entry) => {
  const entity = await loadRepository().then((result) => result);
  const id = await idGenerator().then((result) => result);
  const newData = await { ...entry, id };
  const newEntity = await { ...entity, newData };
  saveRepository(newEntity);
  return newData;
};

const deleteById = async (id) => {
  const entity = await loadRepository().then((result) => result);
  const newEntity = await entity.filter((entityId) => +id !== entityId.id);
  saveRepository(newEntity);
};

const edit = async (entry) => {
  const entity = await loadRepository().then((result) => result);
  const newEntity = { ...entity, entry };
  saveRepository(newEntity);
};

const existById = async (id) => {
  const entity = await loadRepository().then((result) => result);
  return entity.some((entityId) => id === entityId.id);
};

module.exports = {
  findAll: () => loadRepository().then(findAll),
  findById: () => loadRepository().then(findById),
  save: (entry) => save(entry),
  edit: (entry) => edit(entry),
  deleteById: (id) => deleteById(id),
  existById,
};
