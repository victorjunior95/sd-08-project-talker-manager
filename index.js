const express = require('express');
const { checkAge, checkAuth, checkName, checkTalk } = require('./local-modules/validity-checks');
const {
  createTalker,
  editTalker,
  getAllTalkers,
  getTalkerById,
  login,
} = require('./local-modules');

const { mailChecker, passwordChecker, sendToken } = login;
const { checkTalkExistence, checkTalkWatchedAt, checkTalkRate } = checkTalk;

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', mailChecker, passwordChecker, sendToken);

app.post(
  '/talker',
  checkAuth,
  checkName,
  checkAge,
  checkTalkExistence,
  checkTalkWatchedAt,
  checkTalkRate,
  createTalker,
);

app.put(
  '/talker/:id',
  checkAuth,
  checkName,
  checkAge,
  checkTalkExistence,
  checkTalkWatchedAt,
  checkTalkRate,
  editTalker,
);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
