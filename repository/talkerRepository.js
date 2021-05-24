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
    const memory = 5;
    // const memory = JSON.parse(
    //   fs.readFileSync(`${__dirname}/memoryId.txt`, 'utf8'),
    // );
    if (memory) {
      // fs.writeFileSync(
      //   `${__dirname}/memoryId.txt`,
      //   JSON.stringify(+memory + 1),
      //   'utf8',
      // );
      return res(memory);
    }
  });

exports.findAll = () => loadRepository().then((entity) => entity);

exports.findById = async (id) => {
  const entity = await loadRepository().then((result) => result);
  return entity.find((entityId) => +id === entityId.id);
};

exports.findByName = async (name) => {
  const entity = await loadRepository().then((result) => result);
  return entity.filter((entityName) => entityName.name.includes(name));
};

exports.save = async (entry) => {
  const entity = await loadRepository().then((result) => result);
  const id = await idGenerator().then((result) => result);
  const newEntity = await { id, ...entry };
  const newEntities = await [newEntity, ...entity];
  saveRepository(newEntities);
  return newEntity;
};

exports.deleteById = async (id) => {
  const entity = await loadRepository().then((result) => result);
  const newEntity = await entity.filter((entityId) => +id !== entityId.id);
  saveRepository(newEntity);
};

exports.edit = async (entry, id) => {
  const entity = await loadRepository().then((result) => result);
  const removeEntity = await entity.filter((entityId) => +id !== entityId.id);
  const newEntity = { id: +id, ...entry };
  const newEntities = [{ ...newEntity }, ...removeEntity];
  saveRepository(newEntities);
  return newEntity;
};

exports.existById = async (id) => {
  const entity = await loadRepository().then((result) => result);
  return entity.some((entityId) => +id === entityId.id);
};
