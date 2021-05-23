function emailCheck(req, res, next) {
    if (!req.headers.token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (req.headers.token.length < 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    if (!req.body.name) {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (req.body.name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    if (!req.body.age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (req.body.age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    const rx = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
    if (!rx.test(req.body.talk.watchedAt)) {
      return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (Number.isInteger(req.body.talk.rate) 
    && req.body.talk.rate >= 1 && req.body.talk.rate <= 5) {
      return next();
    } 
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    if (!req.body.talk || !req.body.talk.rate || !req.body.talk.watchedAt) {
      return res.status(400)
      .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
       });
    }
}