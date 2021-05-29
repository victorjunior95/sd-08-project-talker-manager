const fs = require('fs');

const getAll = async (req, res) => {
    fs.readFile('talker.json', 'utf8', async (err, data) => {
        if (err) {
            res.status(200).json([]);
        } else {
            res.status(200).json(JSON.parse(data));
        }
    });
};

module.exports = getAll;