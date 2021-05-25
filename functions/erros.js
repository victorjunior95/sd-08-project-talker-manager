const emptyEmail = {
    message: 'O campo "email" é obrigatório',
};
  
const passwordLength = {
    message: 'O "password" deve ter pelo menos 6 caracteres',
};

const emptyPassword = {
    message: 'O campo "password" é obrigatório',
};
  
const ivalidEmail = {
    message: 'O "email" deve ter o formato "email@email.com"',
};

  // /talkes
const notFoundPerson = {
    message: 'Pessoa palestrante não encontrada',
};

module.exports = {
    emptyEmail,
    passwordLength,
    ivalidEmail,
    emptyPassword,
    notFoundPerson,
};
