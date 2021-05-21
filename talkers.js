const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const talkersUtils = require('./fs-util');

const HTTP_OK_STATUS = 200;

router.get('/:id', rescue(async (req, res) => {
    const { id } = req.params;
    const talkers = await talkersUtils.getTalker();

    const talker = talkers.find((person) => person.id === Number(id));

    if (!talker) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(HTTP_OK_STATUS).json(talker);
}));

router.get('/', rescue(async (_req, res) => {
    const talker = await talkersUtils.getTalker();

    if (!talker.length) {
      res.status(HTTP_OK_STATUS).json([]);
    }
    res.status(HTTP_OK_STATUS).json(talker);
}));

module.exports = router;
