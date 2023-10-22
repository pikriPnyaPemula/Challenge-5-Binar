const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUserWithProfile: async (name, email, password, identity_type, identity_number, address) => { 
        try{
            const existUser = await prisma.users.findUnique({where: {email}});
            if(existUser) throw 'email sudah dipakai';

            const userWithProfile = await prisma.users.create({
                data:{
                    name,
                    email,
                    password,
                    profile: {
                        create: {
                            identity_type,
                            identity_number,
                            address
                        },
                    },
                },
                include: {
                    profile: true,
                },
            });
            return userWithProfile;
        } catch(err) {
            throw (err);
        }
    },

    getuserById: async (id) =>{
        try{
            const userWithProfile = await prisma.users.findUnique({where: {id}, include: {profile: true}});
            if(!userWithProfile) throw 'user tidak ditemukan';

            return userWithProfile;
        } catch(err){
            throw(err.message);
        }
    },

    getAllUser: async (req, res) => {
        try{
            const userWithProfile = await prisma.users.findMany({include: {profile:true}});
            if(!userWithProfile) throw 'user tidak ditemukan';
            return userWithProfile;
        } catch(err){
            throw err;
        }
    }
};