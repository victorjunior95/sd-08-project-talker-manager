const fs = require('fs');
const talker = require('../talker.json');

const deleteTalker = async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length === 16) return res.status(401).json({ message: 'Token inválido' });
    const index = talker.findIndex((element) => element.id === Number(id));
    if (index > -1) talker.splice(index, 1);
    const file = JSON.stringify(talker, null, 2);         
    fs.writeFile('talker.json', file, (erro) => {
        if (erro) console.log(`Erro: ${erro}`);
        res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' }); 
    });
};

module.exports = deleteTalker;
