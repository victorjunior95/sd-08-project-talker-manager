const talkerRepository = require('../repository/talkerRepository');

exports.get = async (req, res) => {
  const talker = await talkerRepository.findAll();
  if (talker.length === 0) {
    return res.status(200).json([]); 
  }
  return res.status(200).json(talker);
};

exports.getTalkerById = async (req, res) => {
    const { id } = req.params;
    const talker = await talkerRepository.findById(id);
    if (!talker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      }); 
    }
    return res.status(200).json(talker);
};
