const DATA_ERRADA = 400;

const validaData = (data) => {
  const dia = data.substring(0, 2);
  const mes = data.substring(3, 5);
  const ano = data.substring(6, 10);

  const novaData = new Date(ano, (mes - 1), dia);
  const mesmoDia = parseInt(dia, 10) === parseInt(novaData.getDate(), 10);
  const mesmoMes = parseInt(mes, 10) === parseInt(novaData.getMonth(), 10) + 1;
  const mesmoAno = parseInt(ano, 10) === parseInt(novaData.getFullYear(), 10);

  if (!((mesmoDia) && (mesmoMes) && (mesmoAno))) return false;  
  return true;
};
// http://strique.blogspot.com/2013/04/javascript-validacao-de-data-formato.html

const checkData = (req, res, next) => {
  const { talk: { watchedAt } } = req;
  if (!validaData(watchedAt)) {
    return res.status(DATA_ERRADA)
      .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = checkData;
