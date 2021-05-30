module.exports = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const date = /^\d{2}\/\d{2}\/\d{4}$/;
  const msg = { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
  if (!date.test(watchedAt)) {
 return res.status(400)
    .json(msg); 
}
  next();
};
