const fs = require('fs');

const database = 'talker.json';
function writeTalkers(talkers) {
    const menssage = JSON.stringify(talkers);
    try {
        fs.writeFileSync(database, menssage);
    } catch (err) {
        console.error(`Erro ao ler o arquivo: ${err.path}`);
        console.log(err);
    }
}
module.exports = writeTalkers;