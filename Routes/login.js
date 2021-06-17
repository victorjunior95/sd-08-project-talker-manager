const bodyParser = require('body-parser');

const {
  express,
  token,
} = require('../Helpers');
const { validateLogin } = require('../Validation');

const login = express.Router();

login.use(bodyParser.json());

login.use(validateLogin, token('./data/token.json'));

login.post('/login', validateLogin);

login.post('/', (req, res) => {
  res.status(200).json({ token });
});

module.exports = login;
