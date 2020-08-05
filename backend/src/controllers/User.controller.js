const User = require('../models/User.model')

module.exports = {
    async createUser(req ,res){
        try {
           const {firstName , lastName ,password,email} = req.body;

           const user = await User.create({
            firstName:firstName,
             lastName:lastName,
             password:password, 
             email:email
           })

           return res.json(user);
          
        } catch (error) {
            throw Error(`Error while registering a new user ${error}`);
        }
    }
}