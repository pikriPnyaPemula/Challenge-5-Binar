const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createAccount: async (bank_name, bank_account_number, balance, user_id)=> {
        try{
            const account = await prisma.bankAccounts.create({data: {bank_name, bank_account_number, balance, user: {connect: {id:user_id}}}})
            return account;
        } catch(err){
            throw (err);
        }
    },

    getAccountById: async(id) =>{
        try{
            const account = await prisma.users.findUnique({where: {id}})
            if(!account) throw 'account tidak ditemukan';
            

            return account;
        } catch(err){
            throw(err);
        }
    },

    getAllAccount: async (id) => {
        try{
            const account = await prisma.bankAccounts.findMany();

            return account;
        } catch(err){
            throw(err);
        }
    }
};