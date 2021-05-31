const fs = require('fs');

module.exports = (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const data = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
  const newUser = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const user = data.findIndex((obj) => obj.id === Number(id));
  data[user] = newUser;
  fs.writeFileSync('talker.json', JSON.stringify(data));
  return res.status(200).json(newUser);
};
