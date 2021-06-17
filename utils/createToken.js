module.exports = () => {
  const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEEFGIJKLMNOPQRSTUVWXYZ123456789';
  let token = '';

  for (let i = 0; i < 16; i += 1) {
  token += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return token;
};
