const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Server is running on port 3000.');
});
