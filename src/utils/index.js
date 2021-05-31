const readFileTalker = require('./readFileTalker');
const writeFileTalker = require('./writeFileTalker');

module.exports = {
  readFileTalker,
  writeFileTalker,
};

// const obj = {
//   name: 'Daniel', 
//   teste: 'testando',
// };

// async function insert() {
//   const content = await readFileTalker();
//   const newContent = [...content, obj]; 
//   await writeFileTalker(newContent);
//   // console.log(content);
// }
// insert();

// async function consult() {
//   const content = await readFileTalker();
//   console.log(content);
// }
// consult();