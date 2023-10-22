var express = require('express');
var router = express.Router();
const {create, getuserById, getAllUser} = require('../controllers/users.controllers');


router.post('/', create);
router.get('/:id', getuserById);
router.get('/', getAllUser);

module.exports = router;
