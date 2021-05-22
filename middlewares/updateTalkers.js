const rescue = require('express-rescue');
const { readJSON, writeJSON } = require('../utils');

function parseIfExists(arg) {
  if (arg) return parseInt(arg, 10);
  return undefined;
}

function shouldThrow(method, oldData, intId) {
  const existWithId = oldData.some((talker) => talker.id === intId);
  if (method !== 'POST' && !existWithId) return true;
  return false;
}

function newDataByMethod({ method, oldData, intId, body }) {
  let curTalker;
  switch (method) {
    case 'PUT':
      return [oldData.map((talker) => {
        if (talker.id === intId) {
          curTalker = { ...body, id: intId };
          return { ...body, id: intId };
        }
        return talker;
      }), curTalker];
    case 'POST':
      curTalker = { ...body, id: oldData.length + 1 };
      return [[...oldData, curTalker], curTalker];
    case 'DELETE':
      return [oldData.filter((talker) => talker.id !== intId), curTalker];
    default:
      return [curTalker, curTalker];
  }
}

module.exports = rescue(async (req, _res, next) => {
  const dataPath = './talker.json';
  const { body, params: { id }, method } = req;
  const intId = parseIfExists(id);
  const oldData = await readJSON(dataPath);
  if (shouldThrow(method, oldData, intId)) {
    return next({ status: 404, message: 'Talker não encontrado' });
  }
  const [newData, curTalker] = newDataByMethod({ method, oldData, intId, body });
  req.talker = curTalker;
  const strData = JSON.stringify(newData, null, 2);
  await writeJSON(dataPath, strData, true);
  next();
});
