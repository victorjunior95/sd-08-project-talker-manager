const crypto = require('crypto');

module.exports = (size = 16) => crypto.randomBytes(size).toString('base64').slice(0, size);
