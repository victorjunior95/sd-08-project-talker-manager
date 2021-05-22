const rateValidator = (req, res, next) => {
    const { talk } = req.body;
    const { rate } = talk;

    const validateRate = /^[1-5]$/;
    if (rate === undefined) {
      return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }  
    if (!validateRate.test(rate)) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        }
       
      next();
      };
  
      module.exports = rateValidator;