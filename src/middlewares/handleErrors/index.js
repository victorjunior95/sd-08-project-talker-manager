// Configuração do handleError feito com a ajuda do Mestre Paulo Simões.
function handleErros(err, _req, res, _next) {
  if (err.isBoom) {
    const {
      statusCode,
      payload: { message },
    } = err.output;
    return res.status(statusCode).json({ message });
  }
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }
  res.status(500).json({ message: err.message });
}

module.exports = handleErros;
