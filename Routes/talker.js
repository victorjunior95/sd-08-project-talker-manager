const bodyParser = require('body-parser');
const { express } = require('../Utils');
const {
  validateTalk,
  validateTalker,
  validateToken,
} = require('../Validation');
const {
  createTalker,
  deleteTalker,
  editTalker,
  getTalkersData,
  searchTalkerById,
  searchTalkerByName,
} = require('../Middlewares');

const talker = express.Router();

talker.use(bodyParser.json());

talker.get(
  '/talker/search',
  validateToken,
  searchTalkerByName,
);

talker.get('/talker', getTalkersData);

talker.get('/talker/:id', searchTalkerById);

talker.post(
  '/talker',
  validateTalk,
  validateTalker,
  validateToken,
  createTalker,
);

talker.put(
  '/talker/:id',
  validateTalk,
  validateTalker,
  validateToken,
  editTalker,
);

talker.delete(
  '/talker/:id',
  validateToken,
  deleteTalker,
);

module.exports = talker;
