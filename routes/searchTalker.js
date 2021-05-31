// referencia: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html;
// referencia: Karine Moreira--> https://github.com/ana-karine
const express = require('express');
const fs = require('fs').promises;
const { getToken } = require('../middlewarers/auth');

const router = express.Router();

const SUCCESS = 200;
const FILE = './talker.json';

router.use(getToken);
router.get('/', async (request, response) => {
  const { q } = request.query;
  const file = await fs.readFile(FILE);
  const result = JSON.parse(file.toString('utf-8'));
  const getTalkerByName = result.filter((item) => item.name.includes(q));

  console.log(q);
   if (getTalkerByName) {
    response.status(SUCCESS).send(getTalkerByName);
  }
  if (q === '') {
    response.status(SUCCESS).send(result);
    // 
    }
    if (getTalkerByName === '') {
      response.status(SUCCESS).send([]);
    }
});

module.exports = router;
