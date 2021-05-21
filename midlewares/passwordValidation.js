const passwordValidation = (password) => {
  if (!password) {
    return ({
      validation: false,
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return ({
      validation: false,
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  return ({ validation: true });
};

module.exports = passwordValidation;
