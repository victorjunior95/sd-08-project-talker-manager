const express = require('express');
const fs = require('fs');

const router = express.Router();

// foi pegado esse codigo do aluno massaki que traz o arquivo em objeto
// https://github.com/tryber/sd-08-project-talker-manager/tree/eric-massaki-talker-manager-project
const fsdata = () => JSON.parse(fs.readFileSync('talker.json', 'utf8'));

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
          console.log(datatalkers);
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

module.exports = router;