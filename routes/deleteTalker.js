const fs = require('fs');

const getTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));
module.exports = (req, res) => {
  try {
    const talkers = getTalkers();
    const { id } = req.params;
    const afterDelete = talkers.filter((talker) => talker.id !== Number(id));
    fs.writeFileSync('talker.json', JSON.stringify(afterDelete));
    res
      .status(200)
      .json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    return res.status(500).send({ err });
  }
};
