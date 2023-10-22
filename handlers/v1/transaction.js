const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers');

module.exports = {
    createTransactions: async (req, res, next) => {
        try {
            let {source_account_id, destination_account_id, amount} = req.body;

            let source_account = await prisma.bankAccounts.findUnique({where: {id: source_account_id,},});

            let destination_account = await prisma.bankAccounts.findUnique({where: {id: destination_account_id,},});

            if(!source_account || !destination_account) {
                return res.status(400).json({
                    status: false,
                    message: 'account not found',
                    data: null,
                });
            } 

            if(source_account.balance < amount) {
                return res.status(400).json({
                    status: false,
                    message: 'Failed',
                    data: null,
                });
            }

            let newTransaction = await prisma.transactions.create({

                data: {
                    source_account_id : source_account_id,
                    destination_account_id: destination_account_id,
                    amount: amount,
                },
            });

            await prisma.bankAccounts.update({
                where: {id:source_account_id},
                data: {
                    balance: {
                        decrement: amount,
                    },
                },
            });

            await prisma.bankAccounts.update({
                where: {id:destination_account_id},
                data: {
                    balance: {
                        increment: amount,
                    },
                },
            });

            res.status(200).json({
                status: true,
                message: 'Succeed',
                data: newTransaction,
            });
        } catch(err){
            next(err);
        }

    },

    getAllTransaction: async (req, res, next) => {
        try{
            let {limit = 10, page = 1} = req.query;
            limit = Number(limit);
            page = Number(page);

            let transactions = await prisma.transactions.findMany({
                skip: (page-1) * limit,
                take: limit
            });
            const {_count} = await prisma.transactions.aggregate ({
                _count: {id: true}
            });

            let pagination = getPagination(req, _count.id, page, limit);
            res.status(200).json({
                status: true,
                message: 'Show All Transaction',
                data: {pagination, transactions}
            })
        } catch (err) {
            next(err);
            console.log(err);
        }
    },

    getTransactionDetail: async (req, res, next) => {
        try{
            let {id} = req.params;
            let transactions = await prisma.transactions.findUnique({where: {id: Number(id)}});

            if (!transactions) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: `No transaction found with id ` + id
                });
            }
            res.status(200).json({
                status: true,
                message: 'Show Transaction',
                data: {transactions}
            });
        }catch(err){
            next(err);
        }
    }
};