module.exports = (body, id) => ({
  id: Number(id),
  name: body.name,
  age: body.age,
  talk: {
    watchedAt: body.talk.watchedAt,
    rate: body.talk.rate,
  },
});
