const fs = require("fs");

function readFilePromise(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

readFilePromise("./talker.json") // A função me promete que vai ler o arquivo
  .then((content) => {
    // Caso ela cumpra o que prometeu
    console.log(`Lido arquivo com ${content} bytes`); // Escrevo o resultado no console
  })
  .catch((err) => {
    // Caso ela não cumpra o que prometeu
    console.error(`Erro ao ler arquivo: ${err.message}`); // Escrevo o erro no console
  });

// const getAllTalkers = () =>
//   JSON.parse(fs.readFileSync("./talker.json", "utf-8"));

// const getTalkerById = (id) => {
//   const allTalkers = getAllTalkers();
//   const talker = allTalkers.filter((elem) => elem.id == id);
//   return talker;
// };

