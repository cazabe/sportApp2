const express = require("express");
const Events = require("../models/Events.model");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
module.exports = {
  getEventById(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401).json({ message: "You dont have auth" });
      } else {
        const { event_id } = req.params;

        try {
          const events = await Events.findById(event_id);

          if (events) {
            return res.json({ authData, events });
          } else {
            res.status(400).json({ message: "There is not event" });
          }
        } catch (error) {
          res.status(400).json({ message: "There is not event" });
        }
      }
    });
  },
  async getAllEvents(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401).json({ message: "You are not authorized" });
      } else {
        const { sport } = req.params;
        const query = sport ? { sport } : {};
        try {
          const events = await Events.find(query);

          if (events) {
            return res.json({ authData, events });
          } else {
            res.status(400).json({ message: "There is not events" });
          }
        } catch (error) {
          res.status(400).json({ message: "There is not events" });
        }
      }
    });
  },

  async getEventsByUserId(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401).json({ message: "You are not authorized" });
      } else {
        const { user_id } = req.headers;
        try {
          const userEvents = await Events.find({ user: authData.user._id });
          if (userEvents) {
            return res.json({ authData, userEvents });
          } else {
            res
              .status(400)
              .json({
                message: "There is not events for tyour user ",
                user_id,
              });
          }
        } catch (error) {
          res
            .status(400)
            .json({ message: "There is an error on the request", error });
        }
      }
    });
  },
};
