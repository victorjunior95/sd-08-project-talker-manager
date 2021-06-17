module.exports = (date) => {
  const regexDate = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}/;
  return regexDate.test(date);
};
