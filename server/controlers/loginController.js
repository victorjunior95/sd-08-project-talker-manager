const token = require('../helpers/token');

const post = (_req, resp) => {
    resp.status(200).send(token());
};

module.exports = { post };
