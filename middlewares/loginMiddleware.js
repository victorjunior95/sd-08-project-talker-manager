const validateLogin = [(req, res, next) => {
  if (!req.body.email || req.body.email.length === 0) {
    return res.status(400)
    .json({ message: 'O campo "email" é obrigatório' }); 
  }
  const { email } = req.body;
  if (!/^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  next();
},
(req, res, next) => {
  if (!req.body.password || req.body.password.length === 0) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (req.body.password.length < 6) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
}];

module.exports = validateLogin;