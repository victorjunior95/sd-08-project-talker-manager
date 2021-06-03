const fs = require('fs');

const express = require('express');

const router = express.Router();

// importando funcionalidades e validadores
const {
  req1,
  req2,
  req5,
  req6,
  req7,
  authToken,
  authname,
  authAge,
  authTalk,
  authdata,
  
} = require('../validation');

//     ---- rotas dos requisitos ----

// req-7 deve vir antes de talkerid
router.get('/search', authToken, req7);

// req-1
router.get('/', req1);

// req-2
router.get('/:id', req2);

// req-4
 router.post('/', authToken, authname, authAge, authTalk, authdata, (req, res) => {
 const novoTalker = [req.body];
  
  let te = Object.entries(novoTalker[0]);
   te.splice(1, 0, ['id', 5]);
   te = Object.fromEntries(te);
   novoTalker.splice(0, 1, te);
   novoTalker.push(...(JSON.parse(fs.readFileSync('./talker.json'))));
  fs.writeFileSync('./talker.json', JSON.stringify(novoTalker));
  // console.log(novoTalker);
  res.status(201).send(novoTalker[0]);
}); 

// req-5
router.put('/:id', authToken, authname, authAge, authTalk, authdata,
  req5);

// req-6
router.delete('/:id', authToken, req6, (req, res) => {
   res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso',
  }); 
});  

module.exports = router;