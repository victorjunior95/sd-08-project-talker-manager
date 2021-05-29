const fs = require('fs');

const getAllById = async (req, res) => {
    fs.readFile('talker.json', 'utf8', async (err, data) => {
        const file = Array(JSON.parse(data))[0];
        const result = file.find(({ id }) => id === Number(req.params.id));
        if (!result) {
            res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        } else {
            res.status(200).json(result);
        }
    });
};

module.exports = getAllById;
