const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!/^\w+@\w+(.com)$/m.test(email)) {
        res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    } else {
        next();
    }
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
        res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } else {
        next();
    }
};

module.exports = { validateEmail, validatePassword };
