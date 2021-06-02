const express = require('express');
const rescue = require('express-rescue');
const fs = require('fs/promises');

const router = express.Router();

router.get('/', rescue(async (_, res) => {
    const talkers = await fs.readFile('./talker.json')
        .then((data) => JSON.parse(data));

    res.status(200).json(talkers);
}));

module.exports = router;