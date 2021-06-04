const validateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).send({ message: 'Token não encontrado' });
    } else if (token.length !== 16) {
        res.status(401).send({ message: 'Token inválido' });
    } else {
        next();
    }
};

module.exports = validateToken;
