const express = require("express");
const Events = require("../models/Events.model");
const User = require("../models/User.model");
module.exports = {
    async getEventById(req, res) {
        const { event_id } = req.params;
    
        try {
          const event = await Events.findById(event_id);
    
          if (event) {
            return res.json(event);
          } else {
            res.status(400).json({ message: "There is not event" });
          }
        } catch (error) {
          res.status(400).json({ message: "There is not event" });
        }
      },
      async getAllEvents(req, res) {
        const { sport } = req.params;
        const query = sport ? {sport} : {}
        try {
          const events = await Events.find(query);
    
          if (events) {
            return res.json(events);
          } else {
            res.status(400).json({ message: "There is not events" });
          }
        } catch (error) {
          res.status(400).json({ message: "There is not events" });
        }
      }
}
