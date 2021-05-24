module.exports = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
    return;
  }
  
  if ((password).toString().length < 6) {
    res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
    return;
  }

  next();
};
