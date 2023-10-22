const {createAccount, getAccountById, getAllAccount} = require('../libs/accounts.libs');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    create: async (req, res, next) => {
        try{
            let {bank_name, bank_account_number, balance, user_id} = req.body;

            try{
                let account = await createAccount(bank_name, bank_account_number, balance, user_id);
                return res.status(201).json({
                    status: true,
                    message: 'OK!',
                    data: account
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                })
            }
        } catch(err) {
            next(err);
        }
    },

    getAccountById: async (req, res, next) =>{
        try{
            let {id}=req.params;
            try{
                let user = await getAccountById (Number(id));
                let profile = await prisma.profile.findUnique({ where: {user_id: Number(id)}});
                let bankAccounts = await prisma.bankAccounts.findMany({ where: {user_id: Number(id)}});

                return res.status(200).json({
                    status: true,
                    message: 'OK',
                    data: {
                        user,
                        profile,
                        bankAccounts
                    }
                });
            } catch(err){
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
    } catch(err){
        console.log(err);
        return res.status(400).json({
            status: false,
            message: err,
            data: null
        });
    }
    },

    getAllAccount: async(req, res, next) => {
        try{
            let account = await getAllAccount();
            try{
                return res.status(200).json({
                    status: true,
                    message: 'OK',
                    data: account
                });
            } catch(err){
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
        })
    }
    }
};