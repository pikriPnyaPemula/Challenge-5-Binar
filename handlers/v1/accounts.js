const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../../helpers');

module.exports = {
    // Buat Akun dengan User yang sudah terdaftar
    createAccount: async (req, res, next) => {
        try{
            let { bank_name, bank_account_number, balance, user_id} = req.body;
            
            let newAccount = await prisma.bankAccounts.create({
                data: {
                    bank_name: bank_name,
                    bank_account_number: bank_account_number,
                    balance: balance,
                    user: {connect: {id:user_id}}
                }
            });
            res.status(201).json({
                status: true,
                message: 'Created',
                data: {newAccount}
            })
        } catch (err) {
            next(err);
        }
    },

    // Menampilkan Semua Akun dengan Pagination
    getAllAccount: async (req, res, next) => {
        try{
            let {limit = 10, page = 1} = req.query;
            limit = Number(limit);
            page = Number(page);

            let account = await prisma.bankAccounts.findMany({
                skip: (page-1) * limit,
                take: limit
            });
            const {_count} = await prisma.bankAccounts.aggregate({
                _count: {id: true}
            });

            let pagination = getPagination(req, _count.id, page, limit);
            res.status(200).json({
                status: true,
                message: 'Show All Account',
                data:{pagination, account}
            });
        } catch(err){
            next(err);
        }
    },

    // Menampilkan detail Akun beserta User dan Profilenya
    getAccountDetail: async (req, res, next) => {
        try{
            let {id} = req.params;
            let user = await prisma.users.findUnique ({ where: { id: Number(id)}});
            if(!user) {
                return req.status(400).json ({
                    status: false,
                    message: 'Bad Request',
                    data: `No user found with id ` + id
                });
            }
            let account = await prisma.bankAccounts.findMany({ where: {user_id: Number(id)}});
            let profile = await prisma.profile.findUnique ({ where: {user_id: Number(id)}});

            res.status(200).json({
                status: true,
                message: 'Show User with Profile and Bank Account',
                data: {account, user, profile}
            })
            } catch(err){
                next(err);
            }
        }
    };