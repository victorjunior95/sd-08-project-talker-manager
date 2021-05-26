module.exports = {
  DELETED: 'Pessoa palestrante deletada com sucesso',
  NOT_FOND: 'Pessoa palestrante não encontrada',
  AUTH_TOKEN: {
    TOKEN_NOT_EXIST: 'Token não encontrado',
    INVALID_TOKEN: 'Token inválido',
  },
  FORM: {
    NAME_NULL: 'O campo "name" é obrigatório',
    NAME_INVALID: 'O "name" deve ter pelo menos 3 caracteres',
    AGE_NULL: 'O campo "age" é obrigatório',
    AGE_INVALID: 'A pessoa palestrante deve ser maior de idade',
    TALK_WATCHEDAT_RATE_NOT_NULL:
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    WATCHEDAT_INVALID: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    RATE_INVALID: 'O campo "rate" deve ser um inteiro de 1 à 5',
  },
  SIGN_IN: {
    EMAIL_INVALID: 'O "email" deve ter o formato "email@email.com"',
    EMAIL_NULL: 'O campo "email" é obrigatório',
    PASSWORD_INVALID: 'O "password" deve ter pelo menos 6 caracteres',
    PASSWORD_NULL: 'O campo "password" é obrigatório',
  },
};
