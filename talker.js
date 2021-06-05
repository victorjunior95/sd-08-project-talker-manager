const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const validateToken = require('./validations/tokenValidation');
const nameValidation = require('./validations/nameValidation');
const ageValidation = require('./validations/ageValidation');
const talkValidation = require('./validations/talkValidation');

const router = express.Router();

const archivePath = './talker.json';

router.get('/', rescue(async (_, res) => {
    const talkers = await fs.readFile(archivePath)
        .then((data) => JSON.parse(data));

    res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
    const { id } = req.params;

    const talkers = await fs.readFile(archivePath)
        .then((data) => JSON.parse(data));

    const talker = talkers.find((t) => parseInt(t.id, 10) === parseInt(id, 10));

    if (!talker) {
        res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(talker);
}));

router.post('/',
    validateToken,
    nameValidation,
    ageValidation,
    talkValidation.validateTalk,
    talkValidation.validateRate,
    talkValidation.validateWatchedAt,
    rescue(async (req, res) => {
        const { name, age, talk } = req.body;

        const talkers = await fs.readFile(archivePath)
            .then((data) => JSON.parse(data));

        const newUser = {
            id: talkers.length + 1,
            name,
            age,
            talk,
        };

        talkers.push(newUser);

        await fs.writeFile(archivePath, JSON.stringify(talkers));

        res.status(201).json(newUser);
    }));

router.put('/:id',
    validateToken,
    nameValidation,
    ageValidation,
    talkValidation.validateTalk,
    talkValidation.validateRate,
    talkValidation.validateWatchedAt,
    rescue(async (req, res) => {
        const { name, age, talk } = req.body;
        const { id } = req.params;

        const talkers = await fs.readFile(archivePath)
            .then((data) => JSON.parse(data));

        const updatedUser = { id: Number(id), name, age, talk };

        talkers.forEach((t, index) => {
            if (parseInt(t.id, 10) === parseInt(id, 10)) {
                talkers[index] = updatedUser;
            }
        });

        await fs.writeFile(archivePath, JSON.stringify(talkers));

        res.status(200).json(updatedUser);
    }));

router.delete('/:id', validateToken, rescue(async (req, res) => {
    const { id } = req.params;

    const talkers = await fs.readFile(archivePath)
        .then((data) => JSON.parse(data));

    const filteredTalkers = talkers.filter((t) => parseInt(t.id, 10) !== parseInt(id, 10));

    await fs.writeFile(archivePath, JSON.stringify(filteredTalkers));

    res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
}));

module.exports = router;