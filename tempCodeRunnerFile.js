const fs = require('./fs');

const fileTalkerContent = fs.readFile('./talker.json');
console.log(fileTalkerContent);