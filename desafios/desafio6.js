const fs = require('fs').promises;
const path = require('path');

const urlGlobal = path.join(__dirname, '..', 'talker.json');

const readAllTalkers = async () => {
  const read = await fs.readFile(urlGlobal, 'utf-8')
    .then((talker) => JSON.parse(talker))
    .catch((_err) => null);
  return read;
};

const writeAllTalkers = async (add) => {
  const write = await fs.writeFile(urlGlobal, add);
  return write;
};

const validationAuthorization = (authorization) => {
  if (!authorization) return { message: 'Token não encontrado', code: 401 };
  if (authorization && JSON.stringify(authorization).length < 16) {
    return { message: 'Token inválido', code: 401 };
  }
};

const deleteTalkerById = async (id, authorization) => {
  const authorizationsIsValid = validationAuthorization(authorization);
  if (authorizationsIsValid) return { err: authorizationsIsValid };

  const readTalker = await readAllTalkers();
  const deleteTalker = readTalker.filter((data) => data.id !== +id);
  const deleteTalkerStringfy = JSON.stringify(deleteTalker);
  await writeAllTalkers(deleteTalkerStringfy);

  return { message: 'Pessoa palestrante deletada com sucesso', code: 200 };
};

module.exports = { deleteTalkerById };
