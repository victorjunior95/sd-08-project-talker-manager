const router = require('express').Router();
const talkerController = require('../controlers/talkerController');
const authMiddleware = require('../middlewares/authMiddleware');
const validation = require('../middlewares/parametersValidation');

router.get('/', talkerController.get);
router.get('/search', authMiddleware, talkerController.searchID);
router.get('/:id', talkerController.getId);
router.post('/', authMiddleware, validation.validateName,
validation.validateAge, validation.validateObjData,
validation.validateRate, talkerController.postInsert);

router.put('/:id', authMiddleware, validation.validateName,
validation.validateAge, validation.validateObjData,
validation.validateRate, talkerController.putEdit);

router.delete('/:id', authMiddleware, talkerController.deletId);

module.exports = router;
