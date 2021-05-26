const { HandleCustomerError } = require('./HandleCustomerError');
const { typeRegex, httpRequest, returnMessage: { FORM } } = require('../constant');

const valid = () => ({
  name: (name) => !!(name && name.length >= 3),
  age: (age) => age && +age >= 18,
  talk: (talk) => !!(typeof talk === 'object' 
  && talk.watchedAt && talk.rate !== undefined),
  watchart: (watchart) => watchart && new RegExp(typeRegex.VALID_FORMAT_DATE).test(watchart),
  rate: (rate) => rate && (+rate >= 1 && +rate <= 5),
});

const verifyFieldName = (name = '') => {
  if (!name) throw new HandleCustomerError(FORM.NAME_NULL);
  const isValid = valid().name(name);
  if (!isValid) throw new HandleCustomerError(FORM.NAME_INVALID);
};

const verifyFieldAge = (age) => {
  if (!age) throw new HandleCustomerError(FORM.AGE_NULL);
  const isValid = valid().age(age);
  if (!isValid) throw new HandleCustomerError(FORM.AGE_INVALID);
};

const verifyFieldTalker = (talk) => {
  const isValid = valid().talk(talk);
  if (!isValid) throw new HandleCustomerError(FORM.TALK_WATCHEDAT_RATE_NOT_NULL);
};

const verifyFieldTalkerWatchedArt = (watchart) => {
  const isValid = valid().watchart(watchart);
  if (!isValid) throw new HandleCustomerError(FORM.WATCHEDAT_INVALID);
};

const verifyFieldTalkerRate = (rate) => {
  const isValid = valid().rate(rate);
  if (!isValid) throw new HandleCustomerError(FORM.RATE_INVALID);
};

exports.verifyForm = (req, res, next) => {
  const { name, age, talk } = req.body;
  try {
    verifyFieldName(name);
    verifyFieldAge(age);
    verifyFieldTalker(talk);
    verifyFieldTalkerWatchedArt(talk.watchedAt);
    verifyFieldTalkerRate(talk.rate);
    next();
  } catch (error) {
    res.status(httpRequest.HTTP_BAD_REQUEST_STATUS).json({ message: error.message });
  }
};
