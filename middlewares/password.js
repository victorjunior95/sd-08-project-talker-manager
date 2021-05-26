const express = require('express');

const app = express();

app.post('/', (request, response, next) => {
  const { password } = request.body;
  
  if (!password) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório',
    }); 
  }
  if (password.length < 6) {
    return response.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    }); 
  }
  
  next();
});

module.exports = app;
