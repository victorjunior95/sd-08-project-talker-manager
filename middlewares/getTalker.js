const fs = require('fs').promises;

module.exports = (req, res, _next) => {
    fs.readFile('./talker.json', 'utf-8')
    .then((data) => JSON.parse(data))
    .then((talker) => res.status(200).json(talker))
    .catch(() => {
        res.status(200).send([]);
    });
};
