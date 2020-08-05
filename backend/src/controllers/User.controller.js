const User = require('../models/User.model');
const bcrypt = require('bcrypt');

module.exports = {
    async createUser(req ,res){
        try {
           const {firstName , lastName ,password,email} = req.body;

           const existenUser = await User.findOne({email});

           if(!existenUser){
               const hashedPassword = await bcrypt.hash(password , 10) 
               const user = await User.create({
                 firstName,
                 lastName,
                 email,
                 password:hashedPassword
               })
    
               return res.json(user);
           }else{
               return res.status(400).json({message: "User already exist, do you whant to login?"});
           }
          
        } catch (error) {
            throw Error(`Error while registering a new user ${error}`);
        }
    }
}