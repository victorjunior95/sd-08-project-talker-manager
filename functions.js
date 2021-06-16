const findTalkerByID = (talkers, id) => talkers.find((e) => e.id === Number(id));

module.exports = {
  findTalkerByID,
};
