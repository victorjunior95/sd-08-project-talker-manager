const fs = require('fs');
const newFile = require('../services/newFile');

const createTalker = async (req, res) => {
    fs.readFile('talker.json', 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const file = Array(JSON.parse(data))[0];
            const result = await newFile;
            file.push(result);

            const newResult = JSON.stringify(file, null, 2);
            fs.writeFile('talker.json', newResult, (erro) => {
                if (erro) throw err;
                res.status(200).json(result);
            });
        }
    });
};

module.exports = createTalker;