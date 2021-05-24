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

exports.post = async (req, res) => {
  const newTalk = await req.body;
  const talker = await talkerRepository.save(newTalk);
  return res.status(201).json(talker);
};

exports.put = async (req, res) => {
  const newTalk = await req.body;
  const { id } = await req.params;
  if (!await talkerRepository.existById(id)) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  const talker = await talkerRepository.edit(newTalk, id);
  return res.status(200).json(talker);
};

exports.delete = async (req, res) => {
  const { id } = await req.params;
  if (!await talkerRepository.existById(id)) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  await talkerRepository.deleteById(id);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};
