const express = require("express");
const Events = require("../models/Events.model");
const User = require("../models/User.model");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price, date , sport } = req.body;
    const { user_id } = req.headers;
    const { filename } = req.file;

    const user = User.findById(user_id);

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
          date: Date.now(),
          user: user_id,
        });
        return res.json(event);
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Problem saving event, all fields must be fill" });
    }
  },


  async deleteEvents(req , res){
    const {eventId} = req.params
    try {
      await Events.findByIdAndDelete(eventId)
      res.json({message : "Event deleted"});
    } catch (error) {
      res.status(400).json({ message: "There is not event with that id" });
    }
  }
};
