const express = require("express");
const jwt = require("jsonwebtoken");
const Events = require("../models/Events.model");
const User = require("../models/User.model");

module.exports = {
  createEvent(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401).json({ message: "You are not authorized" });
      } else {
        const { title, description, price, date, sport } = req.body;
        const { filename } = req.file;

        const user = User.findById(authData.user._id);

        try {
          if (!user) {
            res.status(400).json({ message: "User dont exist" });
          } else {
            const event = await Events.create({
              title,
              description,
              price: parseFloat(price),
              thumbnail: filename,
              sport,
              date,
              user:authData.user._id,
            });
            return res.json(event);
          }
        } catch (error) {
          return res
            .status(400)
            .json({ message: "Problem saving event, all fields must be fill" });
        }
      }
    });
  },

  async deleteEvents(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401).json({ message: "You are not authorized" });
      } else {
        const { eventId } = req.params;
    try {
      await Events.findByIdAndDelete(eventId);
      res.json({ message: "Event deleted" });
    } catch (error) {
      res.status(400).json({ message: "There is not event with that id" });
    }
      }
    })
    
  },
};
