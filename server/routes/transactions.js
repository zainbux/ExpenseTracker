const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction} = require ('../controllers/transactionsController.js') 

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction)

module.exports = router;

router
    .route('/:id')
    .delete(deleteTransaction)