function findPerson(id, obj) {
   return obj.find((value) => value.id === id);
}

module.exports = findPerson;
