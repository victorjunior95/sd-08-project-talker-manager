// solução encontrada no site: https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascript

module.exports = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let index = 0; index < 16; index += 1) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return { token: result };
};
