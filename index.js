const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
	response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
	if (talker.length === 0) {
		res.status(200).send([]);
	}
	res.status(200).send(talker);
});

app.listen(PORT, () => {
	console.log('Online');
});
