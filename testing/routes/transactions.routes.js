var express = require('express');
var router = express.Router();
const {create, getTransactionbyId, getAllTransaction} = require('../controllers/transactions.controllers');


router.post('/', create);
router.get('/:id', getTransactionbyId);
router.get('/', getAllTransaction);

module.exports = router;