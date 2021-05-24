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
    return response.status(201).json(newTalker);
  } catch (error) {
    return response.status(400).json(`Error: ${error.message}`);
  }
};
