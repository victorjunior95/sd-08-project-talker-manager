module.exports = (req, _res, next) => {
  req.dataPath = './talker.json';
  next();
};