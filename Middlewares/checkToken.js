const MIN_TOKEN_LENGTH = 16;

function testToken(token, res) {
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    } 
    if (token.length < MIN_TOKEN_LENGTH) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
module.exports = testToken;