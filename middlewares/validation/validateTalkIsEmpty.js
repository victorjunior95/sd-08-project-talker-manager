module.exports = (req, res, next) => {
  const { talk = null } = req.body;
  if (!talk || Object.keys(talk).length !== 2) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};
