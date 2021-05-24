const verifyFieldName = (field = '') => {
  const isValid = !!(field && field.length >= 3);
  if (field) {
    if (!isValid) {
      return {
        message: 'O "name" deve ter pelo menos 3 caracteres',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
  }
  return {
    message: 'O campo "name" é obrigatório',
    isValid,
  };
};

const verifyFieldAge = (field) => {
  const isValid = field && +field >= 18;
  if (field) {
    if (!isValid) {
      return {
        message: 'A pessoa palestrante deve ser maior de idade',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
  }
  return {
    message: 'O campo "age" é obrigatório',
    isValid,
  };
};

const verifyFieldTalker = (talk) => {
  const isValid = !!talk || (typeof talk === 'object');

    if (!isValid) {
      return {
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
};

const verifyFieldTalkerWatchedArt = (field) => {
  const dayReg = '(0[1-9]|1[0-9]|2[0-9]|3[0-1])'; 
  const monthReg = '(0[1-9]|1[0-2])'; 
  const yearReg = '(201[4-9]|202[0-9])';
  const dataReg = `^${dayReg}/${monthReg}/${yearReg}`;
  const isValid = field && new RegExp(dataReg).test(field);

    if (!isValid) {
      return {
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
};

const verifyFieldTalkerRate = (field) => {
  const isValid = field && +field > 0 && field <= 5;

    if (!isValid) {
      return {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
};

exports.verifyInfo = (req, res, next) => {
  const { name, age } = req.body;
  const isName = verifyFieldName(name);
  const isAge = verifyFieldAge(age);
  if (!isName.isValid) return res.status(400).json({ message: isName.message }); 
  if (!isAge.isValid) return res.status(400).json({ message: isAge.message }); 
  next();
};

exports.verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  const isTalk = verifyFieldTalker(talk);
  if (!isTalk.isValid) return res.status(400).json({ message: isTalk.message }); 
  const isWatchedAt = verifyFieldTalkerWatchedArt(talk.watchedAt);
  if (!isWatchedAt.isValid) return res.status(401).json({ message: isWatchedAt.message }); 
  const isRate = verifyFieldTalkerRate(talk.rate);
  if (!isRate.isValid) return res.status(400).json({ message: isRate.message }); 
  next();
};
