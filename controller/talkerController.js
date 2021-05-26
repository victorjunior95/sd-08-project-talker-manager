const talkerRepository = require('../helpers/crudTalker');
const { httpRequest, returnMessage } = require('../constant');

exports.get = async (req, res) => {
  const talker = await talkerRepository.findAll();
  if (talker.length === 0) {
    return res.status(httpRequest.HTTP_OK_STATUS).json([]);
  }
  return res.status(httpRequest.HTTP_OK_STATUS).json(talker);
};

exports.getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talker = await talkerRepository.findById(id);
  if (!talker) {
    return res.status(httpRequest.HTTP_NOT_FOND_STATUS).json({
      message: returnMessage.NOT_FOND,
    });
  }
  return res.status(httpRequest.HTTP_OK_STATUS).json(talker);
};

exports.getTalkByName = async (req, res) => {
  const { q: search } = await req.query;
  const talker = await talkerRepository.findByName(search);
  if (!talker) {
    return res.status(httpRequest.HTTP_OK_STATUS).json({});
  }
  return res.status(httpRequest.HTTP_OK_STATUS).json(talker);
};

exports.post = async (req, res) => {
  const newTalk = await req.body;
  const talker = await talkerRepository.save(newTalk);
  return res.status(httpRequest.HTTP_CREATED_STATUS).json(talker);
};

exports.put = async (req, res) => {
  const newTalk = await req.body;
  const { id } = await req.params;
  if (!await talkerRepository.existById(id)) {
    return res.status(httpRequest.HTTP_NOT_FOND_STATUS).json({
      message: returnMessage.NOT_FOND,
    });
  }
  const talker = await talkerRepository.edit(newTalk, id);
  return res.status(httpRequest.HTTP_OK_STATUS).json(talker);
};

exports.delete = async (req, res) => {
  const { id } = await req.params;
  if (!await talkerRepository.existById(id)) {
    return res.status(httpRequest.HTTP_NOT_FOND_STATUS).json({
      message: returnMessage.NOT_FOND,
    });
  }
  await talkerRepository.deleteById(id);
  return res.status(httpRequest.HTTP_OK_STATUS)
  .json({ message: returnMessage.DELETED });
};
