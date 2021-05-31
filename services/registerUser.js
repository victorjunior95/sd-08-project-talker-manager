const fs = require('fs');

module.exports = (req, res) => {
  const { name, age, talk } = req.body;
  const data = fs.readFileSync('talker.json', 'utf-8');
  const dataToUse = JSON.parse(data);
  const newUser = {
    id: dataToUse.length + 1,
    name,
    age,
    talk,
  };
  dataToUse.push(newUser);
  fs.writeFileSync('talker.json', JSON.stringify(dataToUse));
  return res.status(201).json(newUser);
};
