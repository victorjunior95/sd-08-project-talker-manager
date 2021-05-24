module.exports = (req, res, next) => {
  const { talk } = req.body;  
  if (!talk) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  if (talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }
  next();
};