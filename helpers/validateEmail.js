function validateEmail(email) {
  const emailPattern = /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
  const response = {
    message: '',
    validated: true,
  };
  if (!email || email === '') {
    response.message = 'O campo "email" é obrigatório';
    response.validated = false;
    return response;
  }
  if (!emailPattern.test(email)) {
    response.message = 'O "email" deve ter o formato "email@email.com"';
    response.validated = false;
    return response;
  }
  return response;
}

module.exports = validateEmail;