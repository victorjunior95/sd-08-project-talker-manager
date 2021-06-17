const getAllTalkers = require('./services/getTalkers');

module.exports = (req, res) => {
  try {
    const { q } = req.query;
    const talkers = getAllTalkers();

    const talkersByParams = talkers.filter((talker) => talker.name.includes(q));

    if (!q || q === '') {
      return res
        .status(200)
        .send({ talkers });
    }

    return res.status(200).send(talkersByParams);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};