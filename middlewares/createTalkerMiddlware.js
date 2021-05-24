const fs = require('fs/promises');
const { getData } = require('../utils');
const { TALKER } = require('../services');

module.exports = async (request, response, _next) => {
  const data = await getData(TALKER);
  const newTalker = request.body;
  Object.assign(newTalker, { id: data.length + 1 });
  const newTalkersList = [...data, newTalker];
  try {
    await fs.writeFile(TALKER, JSON.stringify(newTalkersList));
    console.log(await fs.readFile(TALKER, 'utf-8'));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
  return response.status(201).json(newTalker);
};
