const fs = require('fs');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const dataTalker = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  if (!dataTalker.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(dataTalker);
});

module.exports = app;
