const emailValidation = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

module.exports = emailValidation;