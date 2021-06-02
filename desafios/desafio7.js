const fs = require('fs').promises;
const path = require('path');

const urlGlobal = path.join(__dirname, '..', 'talker.json');

const readAllTalkers = async () => {
  const read = await fs.readFile(urlGlobal, 'utf-8')
    .then((talker) => JSON.parse(talker))
    .catch((_err) => null);
  return read;
};

const validationAuthorization = (authorization) => {
  if (!authorization) return { message: 'Token não encontrado', code: 401 };
  if (authorization && JSON.stringify(authorization).length < 16) {
    return { message: 'Token inválido', code: 401 };
  }
};

const validationSearchTeam = async (p) => {
  const readTalker = await readAllTalkers();
  if (p === undefined || p === '') return { messagein: readTalker, codein: 200 };

  const searchTalker = readTalker.filter((data) => data.name.includes(p));

  if (searchTalker.length === 0) return { messagein: searchTalker, codein: 200 };
};

const searchTeamByName = async (p, authorization) => {
  const authorizationsIsValid = validationAuthorization(authorization);
  const searchTeamIsValid = await validationSearchTeam(p);

  if (authorizationsIsValid) return { err: authorizationsIsValid };
  if (searchTeamIsValid) return { arr: searchTeamIsValid };
  
  const lowerCase = p.toLowerCase();
  const readTalker = await readAllTalkers();
  const searchTalker = readTalker.filter((data) => data
      .name
      .toLowerCase()
      .includes(lowerCase));

  return { message: searchTalker, code: 200 };
};

module.exports = { searchTeamByName };
