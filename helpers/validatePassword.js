function validatePassword(password) {
  const response = {
    message: '',
    validated: true,
  };
  if (!password || password === '') {
    response.message = 'O campo "password" é obrigatório';
    response.validated = false;
    return response;
  }
  if (password.length <= 5) {
    response.message = 'O "password" deve ter pelo menos 6 caracteres';
    response.validated = false;
    return response;
  }
  return response;
}

module.exports = validatePassword;
