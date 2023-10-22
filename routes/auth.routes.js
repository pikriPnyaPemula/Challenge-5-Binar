const router = require('express').Router();
const {register, login, whoami} = require('../controllers/auth.controllers');
const {restrict} = require('../middlewares/auth.middlewares');
const { createUser, getAllUser, getUserDetail } = require('../handlers/v1/user.js');
const {createAccount, getAllAccount, getAccountDetail} = require('../handlers/v1/accounts.js');
const {createTransactions, getAllTransaction, getTransactionDetail} = require('../handlers/v1/transaction.js');

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', restrict, whoami);
router.post('/users', createUser);
router.get('/users', getAllUser);
router.get('/users/:id', getUserDetail);
router.post('/accounts', createAccount);
router.get('/account', getAllAccount);
router.get('/account/:id', getAccountDetail);
router.post('/transaction', createTransactions);
router.get('/transaction', getAllTransaction);
router.get('/transaction/:id', getTransactionDetail);



module.exports = router;