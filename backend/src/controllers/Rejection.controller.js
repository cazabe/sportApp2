const Registration = require("../models/Registration.model");
const jwt = require("jsonwebtoken");
module.exports = {
   rejection(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if(err){
        res.sendStatus(401);
      }else{
        const { resgistration_id } = req.params;

        try {
          const registration = await Registration.findById(resgistration_id);
          if(registration){
            registration.approved = false;
    
            const approvedRegistration = await registration.save();
            res.json(approvedRegistration);
          }
         
        } catch (error) {
          res.status(400).json(error);
        }
      }
    })
    
  },
};
