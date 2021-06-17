module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).send({ message: 'Token não encontrado' });

    if (token.length !== 16) return res.status(401).send({ message: 'Token inválido' });
    
    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
