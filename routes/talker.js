const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (_req, res) => {
  const fsdata = fs.readFileSync(path.join(__dirname, '../talker.json'));
  if (fsdata) {
    res.status(200).send(JSON.parse(fsdata));
  } else {
    res.status(200).send(JSON.parse([]));
  }
});

module.exports = app;