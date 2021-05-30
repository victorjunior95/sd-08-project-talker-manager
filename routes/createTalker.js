const fs = require('fs');

const createTalker = async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const newFile = { name, age, talk: { watchedAt, rate } };
    fs.readFile('talker.json', 'utf8', async (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const file = JSON.parse(data);
            const id = { id: 1 };
            const newTalker = Object.assign(id, newFile);
            file.push(newTalker);
            const newResult = JSON.stringify(file, null, 2);
            fs.writeFile('talker.json', newResult, (erro) => {
                if (erro) throw err;
                res.status(201).json(newTalker);
            });
        }
    });
};

module.exports = createTalker;