const editTalker = (req) => {
  const { body } = req;
  const { id } = req.params;
  return {
    id,
    name: body.name,
    age: body.age,
    talk: {
      watchedAt: body.talk.watchedAt,
      rate: body.talk.rate,
    },
  };
};

module.exports = editTalker;