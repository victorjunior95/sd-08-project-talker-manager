const erroMiddlewares = ((err, _req, res, _next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ message: err.message, code: err.code });
  }
    res.status(500).json({ error: `Erro: ${err.message}` });
  });

module.exports = erroMiddlewares;
