const readfile = require('../Services/readfile');

module.exports = (req, res) => {
  const { id } = req.params;
  
  readfile()
  .then((data) => {
    if (data.some((elem) => elem.id === Number(id))) {
      const talker = data.find((elem) => elem.id === Number(id));
      res.status(200).json(talker);
    }
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  })
  .catch((err) => console.log(err.message));
};