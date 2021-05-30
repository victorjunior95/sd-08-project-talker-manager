const fs = require('fs');
const rescue = require('express-rescue');

const getAllById = rescue(async (req, res) => {
    fs.readFile('talker.json', 'utf8', async (err, data) => {
        const file = JSON.parse(data);
        const result = file.find(({ id }) => id === Number(req.params.id));
        if (!result) {
            return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        } 
           return res.status(200).json(result);
    });
});

module.exports = getAllById;
