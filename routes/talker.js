const express = require('express');

const fs = require('fs');

// Middleware
const { tokenMidd, ageMidd, nameMidd, talkMidd, talkValiMidd } = require('../middlewares');

const router = express.Router();

// foi pegado esse codigo do aluno massaki que traz o arquivo em objeto
// https://github.com/tryber/sd-08-project-talker-manager/tree/eric-massaki-talker-manager-project
const fsdata = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

router.get('/search', tokenMidd, (req, res) => {
  const { q } = req.query;
  const allTalkers = fsdata();
  const searchTerm = allTalkers.filter(({ name }) => name.includes(q));

  if (searchTerm) {
    res.status(200).json(searchTerm);
  }
  res.status(200).json(allTalkers);
});

// requisito 1
// router.get('/', (_req, res) => {
//   const fsdata = fs.readFileSync(path.join(__dirname, '../talker.json'));
//   if (fsdata) {
//     res.status(200).send(JSON.parse(fsdata));
//     console.log(datajson);
//   } else {
//     res.status(200).send(JSON.parse([]));
//   }
// });

router.get('/', (_req, res) => {
  try {
    const datatalkers = fsdata();
    if (datatalkers) {
      res.status(200).json(datatalkers);
      // console.log(datatalkers);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

// requisito 2
router.get('/:id', (req, res) => {
  try {
    const datatalkers = fsdata();
    const idParam = parseInt(req.params.id, 10);
    const idArray = datatalkers.find((idfs) => idfs.id === idParam);
    if (idArray) {
      res.status(200).json(idArray);
    } else {
      res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.use(tokenMidd);

// requisito 6
router.delete('/:id', (req, res) => { 
  const { id } = req.params;
  const idNum = Number(id);
  console.log(idNum);
  const allTalkers = fsdata();
  const index = idNum - 1;
  allTalkers.splice(index, 1);
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(ageMidd, nameMidd, talkMidd, talkValiMidd);

// A requisição deve ter o token de autenticação nos headers.
// auxilio dos alunos Karine , Rita , Arnaelcio
// https://github.com/tryber/sd-08-project-talker-manager/tree/ana-karine-sd-08-project-talker-manager
// https://github.com/tryber/sd-08-project-talker-manager/tree/RitaJeveaux-talker-manager
// https://github.com/tryber/sd-08-project-talker-manager/tree/arnaelcio-sd-08-project-talker-manager

// requisito 4
router.post('/', (req, res) => {
  const createTalker = req.body;
  const allTalkers = fsdata();
  // const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  createTalker.id = allTalkers.length + 1;
  allTalkers.push(createTalker);
  // console.log(allTalkers);
  // fs.writeFile(`${__dirname} ${allTalkers}`, JSON.stringify(allTalkers));
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  res.status(201).json(createTalker);
});

// requisito 5
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const allTalkers = fsdata();
  allTalkers[id - 1] = { id: Number(id), ...req.body };
  fs.writeFileSync(`${__dirname}/../talker.json`, JSON.stringify(allTalkers));
  res.status(200).json(allTalkers[id - 1]);
});

module.exports = router;
