const rescue = require('express-rescue');
const { getTalkers } = require('../../utils');

module.exports = rescue(async (_request, response, _next) => {
const talker = await getTalkers();
response.status(200).json(talker);
});