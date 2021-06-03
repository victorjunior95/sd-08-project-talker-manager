const express = require('express');

const app = express();
// const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const router = require('./routes');

app.use('/talker', router.talkerRoutes);
app.use('/login', router.loginRoute);

app.listen(PORT, () => {
  console.log('Online');
});