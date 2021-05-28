const fs = require('fs');

const authToken = (req, res, next) => {
  fs.readFileSync('./talker.json');
  const tokenAtual = JSON.parse(req.headers.authorization.slice(7));
  const { token } = tokenAtual;
  if (!token) {
    return res.status(401).send(
      { message: 'Token não encontrado' },
    );
  } if (token !== tokenAtual.token) {
      res.status(401).send(
        { message: 'Token inválido' },
      );  
    }
   next();
  };

 module.exports = authToken; 
