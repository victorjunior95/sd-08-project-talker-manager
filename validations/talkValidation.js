const validateWatchedAt = (req, res, next) => {
    const { talk } = req.body;

    if (!/^\d{2}\/\d{2}\/\d{4}$/m.test(talk.watchedAt)) {
        res.status(400).send({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    } else {
        next();
    }
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || !talk.rate) {
        res.status(400).send({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    } else {
        next();
    }
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate < 1 || talk.rate > 5) {
        res.status(400).send({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    } else {
        next();
    }
};

module.exports = { validateRate, validateTalk, validateWatchedAt };