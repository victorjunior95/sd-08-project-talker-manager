const express = require('express');
// const bodyParser = require('body-parser');
const getTalkerJson = require('./fs-talkers');

// const app = express();

const router = express.Router();

router.get('/', async (_req, res) => {
  const obj = await getTalkerJson();
  if (!obj) {
    return res.status(401);
  }
  return res.status(200).json(obj);
});

module.exports = router;
