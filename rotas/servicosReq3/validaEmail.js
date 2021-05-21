// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const validaEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

module.exports = validaEmail;
