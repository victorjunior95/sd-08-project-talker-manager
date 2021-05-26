const fs = require('fs');
// const fsProm = require('fs').promises;

const filePath = './talker.json';

const getSyncData = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeSyncData = (json, writeFile) => fs.writeFileSync(json, JSON.stringify(writeFile));

// let fsPromiseData1;
// let fsPromiseData2;

// metódo 1: com promise .then e .catch;
// posso tanto fazer o assigment 
// const assigingFs1 = () => fsProm.readFile(filePath, 'utf8')
// .then((result) => { fsPromiseData1 = JSON.parse(result); }).catch((err) => console.log(err)); 

// console.log(fsPromiseData1);
// quanto fazer diretamente
// const direct1 = () => fsProm.readFile(filePath, 'utf8')
// .then((result) => JSON.parse(result)).catch((err) => console.log(err)); 

// // método 2: com async try/catch;
// // fazendo o assigment
// const assigingFs2 = async () => { 
// try {
//  await fs.readFile(filePath, 'utf8', (err, data) => {
//    if (err) console.log(err);
//    fsPromiseData2 = JSON.parse(data);
//  });
// } catch (error) {
//   console.error(error);
// }
// };
// assigingFs2();

// diretamente ??
// const direct2 = async () => { 
//   try {
//    const result = fs.readFile(filePath, 'utf8', (err, data) => {
//      if (err) console.log(err);
//      return data;
//    });
//    return result;
//   } catch (error) {
//     console.error(error);
//   }
//   };
//   direct2();

// método 3: com promise resolve/reject
const promiseRs1 = () => new Promise((resolve, reject) => {
  fs.readFile('./talker.json', (err, data) => {
    if (err) reject(err);
    resolve(JSON.parse(data));
  });
});

const tokenGenerate = (size) => {
  const chars = [...'abcdefghijklmniopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
  // and then just do:
  const token = [...Array(size)].map((_usage) => 
    chars[Math.round(Math.random() * chars.length)]).join``; // join`` == join('') || join(``); fonte https://stackoverflow.com/questions/64993915/what-does-join-mean-in-javascript
  return token;
  };

module.exports = {
  getSyncData,
  // fsPromiseData1,
  // fsPromiseData2,
  // assigingFs1,
  // assigingFs2,
  // direct1,
  promiseRs1,
  tokenGenerate,
  writeSyncData,
};
