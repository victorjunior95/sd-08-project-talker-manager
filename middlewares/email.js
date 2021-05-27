const emailLogin = ((request, response, next) => {
  const { email } = request.body;
  const regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  
  if (!email) {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    }); 
  }
  if (!regex.test(email)) {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    }); 
  }

  next();
});

module.exports = emailLogin;
