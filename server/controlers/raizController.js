const HTTP_OK_STATUS = 200;

const get = ('/', (_request, response) => {
    response.status(HTTP_OK_STATUS).send();
  });

module.exports = get;
