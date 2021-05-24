const login = (req, res, _) => {
  console.log('login');
  res.status(200).send('login');
};

module.exports = login;
