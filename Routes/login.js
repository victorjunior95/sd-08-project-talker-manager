const bodyParser = require('body-parser');
const crypto = require('crypto');
const { express } = require('../Utils');

const { validateLogin } = require('../Validation');
const { updateToken } = require('../Middlewares');

const login = express.Router();

login.use(bodyParser.json());

login.use(validateLogin, updateToken('./data/token.json'));

login.post('/login', validateLogin);

login.post('/', (req, res) => {
  const token = ((crypto.randomBytes(20).toString('hex'))).substring(0, 16);
  res.status(200).json({ token });
});

module.exports = login;
