const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/enviroment');

module.exports.createsession = async function(req,res){
    
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: 'Invalid password'
            });
        }
        return res.json(200, {
            message: 'Sign in successfully and here is your token',
            data: {
                token: jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn : '1000000'})
            }
        })
    }catch(err){
        console.log('********',err);
        return res.json(500,{
            message : 'Inernal server error'
        });
    }
}