const express = require('express');
const Registration = require('../models/Registration.model');


module.exports = {
    async createRegistration(req, res){
        const {user_id} = req.headers;
        const {eventId} = req.params;
        const {date} = req.body;

        try {
            const registration = await Registration.create({
                user:user_id,
                event:eventId,
                date
            })
    
            // use this to populate the complete document for event and use is like an inner join in relational database
            await registration
            .populate('event')
            .populate('user' , '-password')
            .execPopulate();
    
            return res.json(registration);
        } catch (error) {
            return res.status(400).json({message: "Problems with creating a registration"});
        }
       

    },

    async getRegistration(req ,res){
        const {registration_id} = req.params

        try {
            const registration = await Registration.findById(registration_id)
            await registration
            .populate('event')
            .populate('user' , '-password')
            .execPopulate();
            return res.json(registration)
        } catch (error) {
            return res.status(400).json({message: "Registration not found"})
        }
    }
}