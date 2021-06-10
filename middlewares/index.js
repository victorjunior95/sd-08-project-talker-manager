const getTalker = require('./getTalker');
const talkerId = require('./talkerId');
const login = require('./login');
const token = require('./token');
const name = require('./name');
const age = require('./age');
// const talks = require('./talks');
const rate = require('./rate');
const watchedAt = require('./watchedAt');
const newTalker = require('./newTalker');
const editTalker = require('./editTalker');
const deleteTalkers = require('./deleteTalkers');
const searchTalker = require('./searchTalker');

module.exports = {
    getTalker,
    talkerId,
    login,
    token,
    age,
    name,
    // talks,
    rate,
    watchedAt,
    newTalker,
    editTalker,
    deleteTalkers,
    searchTalker,
};
