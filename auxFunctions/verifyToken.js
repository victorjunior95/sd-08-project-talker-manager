const validateToken = (token) => {
    const numberToComperToken = 16;
    if (!token) { 
        return { message: 'Token não encontrado' };
    }
    if (token.length < numberToComperToken) {
       return { message: 'Token inválido' };
    }
};
const verifyToken = (authorization, res) => {
    const isTokenValid = validateToken(authorization);
    if (isTokenValid) {
     return res.status(401).json(isTokenValid);
    }
};

module.exports = verifyToken;
