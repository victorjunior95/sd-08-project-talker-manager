const validationEmailMiddleware = (req, res, next) => {
    const { email } = req.body;    
    console.log(email);

    const validateEmail = (mail) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(mail);
    };
    const isEmailValid = validateEmail(email);
  
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }  
    if (!isEmailValid) {
      return res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"', 
      });      
    }
    return next();
  };

  module.exports = validationEmailMiddleware;