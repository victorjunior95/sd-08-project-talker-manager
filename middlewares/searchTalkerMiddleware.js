const { getData } = require('../utils');
const { TALKER } = require('../services');

module.exports = async (request, response, _next) => {
  const talkersList = await getData(TALKER);
  let query = request.query.q;
  if (!query) { query = ''; }
  const regex = new RegExp(`${query}`);
  const list = [];
  await talkersList.forEach((talker) => {
    if (regex.test(talker.name)) { list.push(talker); }
  });
  return response.status(200).json(list);
};
