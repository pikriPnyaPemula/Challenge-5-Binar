const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../../helpers');

module.exports = {
    // Buat Akun Beserta dengan Profile
    createUser: async (req, res, next) => {
        try {
            let {name, email, password, identity_type, identity_number, address} = req.body;

            let newUser = await prisma.users.create({
                data: {
                    name: name,
                    email : email,
                    password : password
                }
            })
            let newProfile = await prisma.profile.create({
                    data: {
                        identity_type: identity_type,
                        identity_number: identity_number,
                        address: address,
                        user_id: newUser.id
                    }
            });
            res.status(201).json({
                status: true,
                message: 'Created',
                data: {
                    user: newUser,
                    profile: newProfile
                }
            });
        } catch(err){
            next(err);
        }
    },
    
    getAllUser: async (req, res, next) => {
        try{
            let {limit = 10, page = 1} = req.query;
            limit = Number(limit);
            page = Number(page);

            let user = await prisma.users.findMany({
                skip: (page-1) * limit,
                take: limit
            });
            const {_count} = await prisma.users.aggregate({
                _count: {id: true}
            });

            let pagination = getPagination(req, _count.id, page, limit);
            res.status(200).json({
                status: true,
                message: 'Show All User',
                data: {pagination, user}
            });
        } catch(err){
            next(err);
        }
    },

    getUserDetail: async (req, res, next) => {
        try {
            let {id} = req.params;
            let user = await prisma.users.findUnique ({ where: { id: Number(id)}});
            let profile = await prisma.profile.findUnique ({ where: {user_id: Number(id)}})

            if (!user) {
                return req.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: `No user found with id ` + id
                });
            }
            res.status(200).json({
                status: true,
                message: 'Show User with Profile',
                data: {user, profile}
            });
        } catch (err){
            next(err);
        }
    }
};