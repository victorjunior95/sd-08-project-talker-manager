const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// READ
// localhost:3000/talker/
app.get('/', (req, res) => {
  const getAllTalkers = JSON.parse(fs.readFileSync(__dirname + '/../talker.json'));
  res.status(200).send(getAllTalkers);
});


module.exports = app;