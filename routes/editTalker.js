const fs = require('fs');

const editTalker = async (req, res) => {
    // const { name, age, talk: { watchedAt, rate } } = req.body;
    // const newFile = { name, age, talk: { watchedAt, rate } };
    const { authorization } = req.headers;
    const { id } = req.params;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length === 16) return res.status(401).json({ message: 'Token inválido' });
    fs.readFile('talker.json', (err, data) => {
        if (err) console.log(err);        
        const result = JSON.parse(data).filter((elem) => elem.id !== Number(id));
        console.log(result);
        // const idNew = { id: 1 };
        // const newTalker = Object.assign(idNew, newFile);
        // result.push(newTalker);
        // const newResult = JSON.stringify(result, null, 2);
        // fs.writeFile('talker.json', newResult, (erro) => {
        //     if (erro) throw err;
        //     res.status(201).json(newTalker);       // });
    });
};   

module.exports = editTalker;