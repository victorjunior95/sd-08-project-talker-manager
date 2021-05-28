const rex = /[1-3][0-9]\/[0-1][0-9]\/[0-2][0-9][0-9][0-9]/;
const authdata = (req, res, next) => {
  const { watchedAt } = req.body.talk;
   if (!rex.test(watchedAt)) {
    return res.status(400).json(
      { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
    ); 
}
    next();
    };
module.exports = authdata;
