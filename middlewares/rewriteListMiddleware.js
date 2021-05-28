const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const rewriteList = async (listString) => {
  await fs.writeFile('talker.json', listString, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = rewriteList;