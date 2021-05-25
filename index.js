const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');

const pathFile = './talker.json';
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use('/talker', router);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

router.route('/')
  .get(middlewares.allTalkers, (req, res) => {
    res.status(200).json(req.talkersAll);
  })
  .post(middlewares.tokenVerify, middlewares.checkName,
  middlewares.checkAge, middlewares.checkTalk, middlewares.checkDateRate, async (req, res) => {
    try {
      const talkers = JSON.parse(await fs.promises.readFile(pathFile, 'utf-8'));
      const newTalker = {
        name: req.body.name,
        age: req.body.age,
        id: talkers.length + 1,
        talk: req.body.talk,
      };
      talkers.push(newTalker);
      await fs.promises.writeFile('./talker.json', JSON.stringify(talkers));
      res.status(201).json(newTalker);
    } catch (error) {
      console.log(error.menssage);
    }
  });

router.get('/search', middlewares.tokenVerify, async (req, res) => {
  const { q } = req.query;
  try {
    const talkers = JSON.parse(await fs.promises.readFile(pathFile, 'utf-8'));
    const talkersResult = talkers.filter((talker) => talker.name.includes(q));
    res.status(200).json(talkersResult);
  } catch (error) {
    console.log(error.menssage);
  }
});

app.post('/login', middlewares.loginEmail, middlewares.loginPassword, (_req, res) => {
  res.status(200).json({
    token: '7mqaVRXJSp886CGr',
  });
});

router.route('/:id')
  .get(middlewares.talkerById, (req, res) => {
    if (req.talkerID) {
      res.status(200).json(req.talkerID);
      return;
    }

    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  })
  .put(middlewares.tokenVerify, middlewares.checkName,
  middlewares.checkAge, middlewares.checkTalk, middlewares.checkDateRate, async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = JSON.parse(await fs.promises.readFile(pathFile, 'utf-8'));
      const newTalker = {
        name: req.body.name,
        age: req.body.age,
        id: parseInt(id, 10),
        talk: req.body.talk,
      };
      talkers.splice(parseInt(id, 10) - 1, 1, newTalker);
      await fs.promises.writeFile(pathFile, JSON.stringify(talkers));
      res.status(200).json(newTalker);
    } catch (error) {
      console.log(error.menssage);
    }
  })
  .delete(middlewares.tokenVerify, async (req, res) => {
    const { id } = req.params;
    try {
      const talkers = JSON.parse(await fs.promises.readFile(pathFile, 'utf-8'));
      talkers.splice(parseInt(id, 10) - 1, 1);
      await fs.promises.writeFile('./talker.json', JSON.stringify(talkers));
      res.status(200).json({
        message: 'Pessoa palestrante deletada com sucesso',
      });
    } catch (error) {
      console.log(error.menssage);
    }
  });

app.listen(PORT, () => {
  console.log('Online');
});
