const editTalker = (body, id) => {
  const newId = Number(id);
  return {
    id: newId,
    name: body.name,
    age: body.age,
    talk: {
      watchedAt: body.talk.watchedAt,
      rate: body.talk.rate,
    },
  };
};

module.exports = editTalker;