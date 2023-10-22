const {createUserWithProfile, getuserById, getAllUser} = require('../libs/users.libs');

module.exports = {
    create: async (req, res, next) => {
        try{
            let {name, email, password, identity_type, identity_number, address} = req.body;

            try{
                let user = await createUserWithProfile(name, email, password, identity_type, identity_number, address);
                return res.status(201).json({
                    status: true,
                    message: 'OK!',
                    data: user
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

    getuserById: async(req, res, next) => {
        try{
            let {id} = req.params;
            try{
                let user = await getuserById(Number(id));

                return res.status(200).json({
                    status: true,
                    message: 'OK!',
                    data: user
                });
            } catch(err){
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch(err){
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    },
    
    getAllUser: async(req, res, next) => {
        try {
            let user = await getAllUser();
            try {
                return res.status(200).json({
                    status: true,
                    message: 'OK',
                    data: user
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    }
};