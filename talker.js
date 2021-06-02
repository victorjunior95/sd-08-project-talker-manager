const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const router = express.Router();

router.get('/', rescue(async (_, res) => {
    const talkers = await fs.readFile('./talker.json')
        .then((data) => JSON.parse(data));

    res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
    const { id } = req.params;

    const talkers = await fs.readFile('./talker.json')
        .then((data) => JSON.parse(data));

    const talker = talkers.find((t) => parseInt(t.id, 10) === parseInt(id, 10));

    if (!talker) {
        res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
}));

module.exports = router;