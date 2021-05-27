const deletePerson = (id, obj) => obj.filter((value) => value.id !== id);

module.exports = deletePerson;
