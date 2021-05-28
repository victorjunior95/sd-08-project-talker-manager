const fs = require('fs');

const authToken = (req, res, next) => {
  fs.readFileSync('./talker.json');
  req.headers.authorization = JSON.parse(req.headers.authorization);
  const tokenAtual = req.headers.authorization;
  const { token } = tokenAtual;
  console.log(req.headers.authorization);
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
