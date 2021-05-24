const rescue = require('express-rescue');
const { getAllPeople, setNewTalker } = require('../util');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const data = await getAllPeople();
  const result = data.filter((el) => el.id !== Number(id));
  await setNewTalker(result);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});
