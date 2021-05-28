const readFile = require('../helpers/readFile');
const findPerson = require('../helpers/findPerson');
const writePerson = require('../helpers/writePerson');
const editPerson = require('../helpers/editPerson');
const deletePerson = require('../helpers/deletePerson');
const writeDelete = require('../helpers/writeDelete');
const { notFoundPerson, msgDeletePerson } = require('../helpers/errorMessages');

const pathTalker = './talker.json';
const HTTP_OK_STATUS = 200;

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

const putEdit = async (req, resp) => {
    const { id } = req.params;
    const intID = parseInt(id, 10);
    const fileContent = JSON.parse(readFile(pathTalker));
    let result = findPerson(intID, fileContent);
    
    result = req.body;
    resp.status(200).send(await editPerson('./talker.json', result, intID));
};

const deletId = async (req, resp) => {
  const { id } = req.params;
  const intID = parseInt(id, 10);
  const fileContent = JSON.parse(readFile(pathTalker));
  const result = deletePerson(intID, fileContent);
  
  const stringResult = JSON.stringify(result);
  const final = await writeDelete('./talker.json', stringResult);
  
  if (final) return resp.status(200).send(msgDeletePerson);
};

const searchID = (req, resp) => {
  const { q } = req.query;
  const fileContent = JSON.parse(readFile(pathTalker));
  const resposta = fileContent
   .filter((value) => value.name.toLowerCase().includes(q.toLowerCase()));
  resp.status(200).send(resposta);
};

module.exports = {
    get,
    getId,
    postInsert,
    putEdit,
    deletId,
    searchID,
};