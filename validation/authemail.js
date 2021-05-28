/* verifica email da req */

const authemail = (req, res, next) => {
  const regxp = /.+@[A-z]+[.]com/;
  const { email } = req.body;

 if (!email) {
      return (res.status(400).send(
        { message: 'O campo "email" é obrigatório' },
      ));
  } 

  if (!regxp.test(email)) {
    return (res.status(400).send(
      { message: 'O "email" deve ter o formato "email@email.com"' },
    ));
  }
  
  next();
};
  
module.exports = authemail;
