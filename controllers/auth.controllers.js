const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;

module.exports = {
    register: async (req, res, next) =>{
        try{
            let {name, email, password, password_confirmation} = req.body;
            if(password != password_confirmation){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'password and password confirmation must be match!',
                    data: null
                });
            }

            let userExist = await prisma.users.findUnique({where: {email}})
            if(userExist){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'user has already exist!',
                    data: null

                });
            }

            let encryptPassword = await bcrypt.hash(password, 10);
            let user = await prisma.users.create({
                data: {
                    name,
                    email,
                    password: encryptPassword
                }
            });

            return res.status(201).json({
                status: true,
                message: 'Created',
                err: null,
                data: {user}
            })
        } catch(err){
            next(err);
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
                err: err.message, // Menggunakan pesan kesalahan yang lebih spesifik
                data: null
            })
        }
    },

    login: async (req, res, next)=>{
        try{
            let{email, password} = req.body;

            let user = await prisma.user.findUnique({where: {email}});
            if(!user){
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    err: 'invalid email or password!',
                    data: null
                });
            }

            let token = jwt.sign({id: user.id}, JWT_SECRET_KEY);

            return res.status(200).json({
                status: true,
                message: 'OK',
                err: null,
                data: {user, token}
            });
        } catch(err){
            next(err);
        }
    },

    whoami: (req, res, next)=>{
        return res.status(200).json({
            status: true,
            message: 'OK',
            err: null,
            data: {user: req.user}
        });
    }
};