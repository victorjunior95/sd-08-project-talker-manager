// Regex retirada da seguinte página: https://formik.org/docs/guides/validation
module.exports = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
