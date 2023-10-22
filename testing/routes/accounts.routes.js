var express = require('express');
var router = express.Router();
const {create, getAccountById, getAllAccount} = require('../controllers/accounts.controllers');


router.post('/', create);
router.get('/:id', getAccountById);
router.get('/', getAllAccount);

module.exports = router;