const readFile = require('../helpers/readFile');
const findPerson = require('../helpers/findPerson');
const writePerson = require('../helpers/writePerson');

const pathTalker = './talker.json';
const HTTP_OK_STATUS = 200;

const notFoundPerson = {
    message: 'Pessoa palestrante não encontrada',
  };

const get = (_req, resp) => {
    const fileContent = JSON.parse(readFile(pathTalker));
    const emptyArray = [];
    if (!fileContent) resp.status(HTTP_OK_STATUS).send(emptyArray);
    resp.status(HTTP_OK_STATUS).json(fileContent);
};

const getId = (req, resp) => {
  const { id } = req.params;
  const intID = parseInt(id, 10);
  const fileContent = JSON.parse(readFile(pathTalker));
  const result = findPerson(intID, fileContent);
  if (result) return resp.status(HTTP_OK_STATUS).json(result);
  resp.status(404).json(notFoundPerson);
};

const postInsert = async (req, resp) => {
    resp.status(201).send(await writePerson('./talker.json', req.body));
};

module.exports = {
    get,
    getId,
    postInsert,
};