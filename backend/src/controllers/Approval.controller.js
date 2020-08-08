const Registration = require("../models/Registration.model");

module.exports = {
  async approval(req, res) {
    const { resgistration_id } = req.params;

    try {
      const registration = await Registration.findById(resgistration_id);

      registration.approved = true;

      const approvedRegistration = await registration.save();
      res.json(approvedRegistration);

    } catch (error) {
      res.status(400).json(error);
    }
  },
};