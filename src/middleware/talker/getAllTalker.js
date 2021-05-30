const rescue = require('express-rescue');
const { readDataTalkers } = require('../../utils/readDataTalkers');

module.exports = rescue(async (_request, response, _next) => {
  try {
    const dataTalker = await readDataTalkers();
    response.status(200).json(dataTalker);
  } catch (err) {
    console.log(err);
  }
});
