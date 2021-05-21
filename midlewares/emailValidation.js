const emailValidation = (email) => {
  if (!email) {
    return ({
      validation: false,
      message: 'O campo "email" é obrigatório',
    });
  }

  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

  if (!emailRegex.test(email)) {
    return ({
      validation: false,
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  return ({ validation: true });
};

module.exports = emailValidation;
