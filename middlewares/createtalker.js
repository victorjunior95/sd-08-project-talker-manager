const fs = require('fs').promises;

const service = './talker.json';

function callDataApi() {
  return fs.readFile(service, 'utf8')
  .then((data) => JSON.parse(data))
  .catch((error) => {
    console.log(`Não foi possível ler o arquivo ${service}\n Error: ${error}`);
  });
}
module.exports = async (req, res, _next) => {
  const responseDataApi = await callDataApi();
  const { name, age, talk } = req.body;
  // console.log(name, age, talk, authorization, name.length, talk.watchedAt, Number.isInteger(talk.rate), talk.rate.toString().length);
  const id = responseDataApi.length + 1;
  await responseDataApi.push({ id, name, age, talk });
  const newTalker = responseDataApi[responseDataApi.length - 1];
  console.log(newTalker);
  // console.log('registertalker');
  console.log(responseDataApi);
  await fs.writeFile(service, JSON.stringify(responseDataApi));
  return res.status(201).json(newTalker);
};

// const randomToken = '7mqaVRXJSp886CGr';
// const nimOfPassword = 6;

// console.log(messages.passwordIncorrect);

// const emailValidation = (email) => {
//   const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
//   return validEmail.test(email);
// };

// module.exports = (req, res, _next) => {
//   const { email, password } = req.body;
//   // console.log(email, typeof(password), password.toString().length);
//   if (email === undefined) return res.status(400).json({ message: messages.emailRequire });
//   if (!emailValidation(email)) return res.status(400).json({ message: messages.emailIncorrect });
//   if (password === undefined) return res.status(400).json({ message: messages.passwordRequire });
//   if (password.toString().length < nimOfPassword) {
//     return res.status(400).json({ message: messages.passwordIncorrect });
//   }
//   res.json({ token: randomToken });
// };
