const validateToken = (authorization) => {
    const numberToComperToken = 16;
    if (!authorization) { 
        return { message: 'Token não encontrado' };
    }
    if (authorization.length < numberToComperToken) {
       return { message: 'Token inválido' };
    }
};
const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    const isNotTokenValid = validateToken(authorization);
    if (isNotTokenValid) {
     return res.status(401).json(isNotTokenValid);
    }
    next();
};

module.exports = verifyToken;
