const MIN_NAME_LENGTH = 3;
const MIN_AGE = 18;

function testName(name, res) {
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } 
  if (name.length < MIN_NAME_LENGTH) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function testAge(age, res) {
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } 
  if (Number(age) < MIN_AGE) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}
const WR = { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
function testTalk1(talk, res) {
  if (!talk) { return res.status(400).json(WR); }
  const date = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const { watchedAt, rate } = talk;
  if (!watchedAt || !rate) { return res.status(400).json(WR); }
  if (!date.test(String(watchedAt))) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}
function testTalk2(talk, res) {
  const rate = Number(talk.rate);
  // console.log(rate);
  if (rate > 6 || rate < 0) {
 return res.status(400).json(
    { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
  ); 
}
}
function checkTalker(req, res) {
  const { name, age, talk } = req.body;
  testName(name, res);
  testAge(age, res);
  testTalk1(talk, res);
  testTalk2(talk, res);
}
module.exports = checkTalker;