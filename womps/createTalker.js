const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const checks = require('./middle/checks');

const app = express();
app.use(bodyParser.json());
const meuArquivo = 'talker.json';

module.exports = (req, res) => {
  const data = JSON.parse(fs.readFileSync(meuArquivo, 'utf-8'));
  const { name, age, talk } = req.body;
  try {
    checks(req);
    data.push({ name, age, id: data.length + 1, talk });
    fs.writeFileSync('talker.json', JSON.stringify(data));
    res.status(201).json(data[data.length - 1]);
  } catch (error) {
    if (error.message.includes('Token')) return res.status(401).json({ message: error.message });
    return res.status(400).json({ message: error.message });
  }
};
