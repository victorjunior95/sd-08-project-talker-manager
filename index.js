const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(routes);

app.listen(PORT, () => {
  console.log('Server is running on port 3000.');
});
