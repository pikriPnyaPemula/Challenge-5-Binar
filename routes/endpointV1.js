const express = require('express');
const router = express.Router();
const { createUser, getAllUser, getUserDetail } = require('../handlers/v1/user.js');
const {createAccount, getAllAccount, getAccountDetail} = require('../handlers/v1/accounts.js');
const {createTransactions, getAllTransaction, getTransactionDetail} = require('../handlers/v1/transaction.js');

router.get('/', (req, res) =>{
    res.status(200).json({
        status: true,
        message: 'welcome',
        data: null
    });
});

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