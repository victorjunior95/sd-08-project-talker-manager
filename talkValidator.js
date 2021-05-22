const talkValidator = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt, rate } = talk;

    if (!watchedAt || rate === undefined) {
        return res.status(400)
        .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
    }
         
        next();
        };
      module.exports = talkValidator;