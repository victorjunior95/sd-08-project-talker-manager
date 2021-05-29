const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// READ
// localhost:3000/talker/
app.get('/', (req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  res.status(200).json(allTalkers);
});

module.exports = app;