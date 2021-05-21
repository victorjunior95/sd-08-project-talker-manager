// const fs = require('fs');

// getTalker = { Promise((resolve, reject) => {
//     return fs.readFile('./talker.json', 'utf-8', (err, data) => {
//       if (err) {
//         console.error('Não foi possível ler o arquivo');
//         process.exit(1);
//       }
//       return (JSON.parse(data));
//   });
// })}

// function setTalker(newTalker) {
//   return fs.writeFile('./talker.json', JSON.stringify(newTalker));
// }

// module.exports = { getTalker, setTalker };