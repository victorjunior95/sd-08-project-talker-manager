const validName = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
  
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return next();
  };
  
  const validAge = (req, res, next) => {
    const { age } = req.body;
  
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });     
    }
  
    if (age < 18) {
        return res.status(400).json({
            message: 'A pessoa palestrante deve ser maior de idade',
        });      
    }
    return next();
  };
  
  const validTalk = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk || !talk.watchedAt || talk.rate === undefined) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
  
    return next();
  };
  
  const validWatchedAt = (req, res, next) => {
    const { talk } = req.body;
  
    if (talk.watchedAt.split('/').length !== 3) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
  
    return next();
  };
  
  const validRate = (req, res, next) => {
    const { talk } = req.body;
  
    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });    
    }
  
    return next();
  };
  
  module.exports = {    
    validName,
    validAge,
    validTalk,
    validWatchedAt,
    validRate,
  };