const router = require('express').Router();
const talkerController = require('../controlers/talkerController');
const authMiddleware = require('../middlewares/authMiddleware');
const validation = require('../middlewares/parametersValidation');

router.get('/', talkerController.get);
router.get('/:id', talkerController.getId);
router.post('/', authMiddleware, validation.validateName,
  validation.validateAge, validation.validateObjData,
   validation.validateRate, talkerController.postInsert);

module.exports = router;
