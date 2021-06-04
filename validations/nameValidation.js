const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        res.status(400).send({ message: 'O campo "name" é obrigatório' });
    } else if (name.length < 3) {
        res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    } else {
        next();
    }
};

module.exports = validateName;
