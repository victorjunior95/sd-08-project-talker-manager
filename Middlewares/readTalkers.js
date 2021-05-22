const fs = require('fs');

const database = 'talker.json';
function readTalkers(talkers) {
    let menssage = talkers;
    try {
        menssage = JSON.parse(fs.readFileSync(database));
    } catch (err) {
        // console.error(`Erro ao ler o arquivo: ${err.path}`);
        // console.log(err);
    }
    return menssage;
}
module.exports = readTalkers;