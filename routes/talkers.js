const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (_request, response) => {
  response.send(JSON.parse(fs.readFileSync('./talker.json', 'utf-8')));
});

module.exports = app;
