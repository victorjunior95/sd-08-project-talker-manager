const tokenValidator = (req, res, next) => {
const token = req.headers.authorization;
if (!token) {
return res.status(401).json({ message: 'Token não encontrado' });
}

next();
};

module.exports = tokenValidator;