// erros para função validations.js
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
  
  // erro par rota talker do index
  const notFoundPerson = {
    message: 'Pessoa palestrante não encontrada',
  };
  
  // erros para funçao validationsInsert.js
  
  const nameError = {
    message: 'O "name" deve ter pelo menos 3 caracteres',
  };
  
  const nameEmputy = {
    message: 'O campo "name" é obrigatório',
  };
  
  const ageEmputy = {
    message: 'O campo "age" é obrigatório',
  };
  
  const ageError = {
    message: 'A pessoa palestrante deve ser maior de idade',
  };
  
  const dataError = {
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  };
  
  const rateError = {
    message: 'O campo "rate" deve ser um inteiro de 1 à 5',
  };
  
  const talkEmput = {
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
  };

  const msgDeletePerson = { message: 'Pessoa palestrante deletada com sucesso' };
  
  module.exports = {
    emptyEmail,
    passwordLength,
    ivalidEmail,
    emptyPassword,
    notFoundPerson,
    nameError,
    nameEmputy,
    ageEmputy,
    ageError,
    dataError,
    rateError,
    talkEmput,
    msgDeletePerson,
  };
