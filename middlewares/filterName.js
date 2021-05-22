module.exports = (req, _res, next) => {
  const { readData, query: { q } } = req;
  const search = !q ? '' : q;
  req.search = readData.filter(({ name }) => name.includes(search));
  next();
};
