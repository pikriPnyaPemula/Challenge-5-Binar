const {createTransaction, getTransactionbyId, getAllTransaction} = require('../libs/transactions.libs');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res, next)=> {
        try{
            let {source_account_id, destination_account_id, amount} = req.body;
            try{
                let transaction = await createTransaction(source_account_id, destination_account_id, amount);
                return res.status(201).json({
                    status: true,
                    message: 'Created',
                    data: transaction
                })
            } catch(err){
                return res.statu(400).json({
                    status: false,
                    message: err,
                    data: null
                })
            }
        } catch(err){
            next(err);
        }
        
    },
    
    getTransactionbyId: async(req, res, next) =>{
        try{
            let {id} = req.params;
            try{
                let transaction = await getTransactionbyId(Number(id));

                return res.status(201).json({
                    status: true,
                    message: 'Created!',
                    data: transaction
                })
            }catch(err){
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                })
            }
        } catch(err){
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    },
    
    getAllTransaction: async (req, res, next) =>{
        try{
            let transaction = await getAllTransaction();

            return res.status(200).json({
                status: true,
                message: 'OK',
                data: transaction
            })
        } catch(err){
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    }
};