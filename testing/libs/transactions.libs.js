const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createTransaction: async (source_account_id, destination_account_id, amount) => {
        try{
            const source_account = await prisma.bankAccounts.findUnique({where : {id: source_account_id}});
            const destination_account = await prisma.bankAccounts.findUnique({where: {id: destination_account_id}});
            if(!source_account || !destination_account){
                throw 'source account or destination account not found';
            };
            const transaction = await prisma.transactions.create({
                data: {
                    source_account_id: source_account_id,
                    destination_account_id: destination_account_id,
                    amount: amount,
                },
            });
            await prisma.bankAccounts.update({
                where: {id: source_account_id},
                data:{
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
                    }
                }
            });
            return transaction;
        }catch(err){
            console.log(err);
        }
    },

    getTransactionbyId: async (id) => {
        try{
            const transaction = await prisma.transactions.findUnique({where: {id}});
            if(!transaction) throw 'id not found';
            
            return transaction;
        } catch(err){
            throw(err);
        }
    },
    
    getAllTransaction: async (id) => {
        try{
            const transaction = await prisma.transactions.findMany();
            
            return transaction;
        } catch(err){
            throw (err);
        }
    }
};