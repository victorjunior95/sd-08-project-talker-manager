const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/; // https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy

module.exports = (req, res, next) => {
  const { talk } = req.body;
  const talkFind = Object.keys(req.body).some((item) => item === 'talk');
  if (!talkFind || !talk.watchedAt || !talk.rate) {
 return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' }); 
}
  if (!dateRegex.test(talk.watchedAt)) {
 return res.status(400)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
  next();
};