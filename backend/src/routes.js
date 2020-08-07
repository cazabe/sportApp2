const express = require('express');
const multer = require('multer');

const routes = express.Router();

const UserController = require('./controllers/User.controller');
const EventController = require('./controllers/Events.controller');
const DashboardController = require('./controllers/Dashboard.controller');
const LoginController = require('./controllers/Login.controller');

//configurations for handeling the pictures or thumbnail
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

routes.get('/status' , (req,res)=>{
    res.send({status:200});
})

//user
routes.post('/user/register' , UserController.createUser);
routes.get('/user/:userId' , UserController.getUserById);

//Dashboard
routes.get('/events/:sport' , DashboardController.getAllEvents);
routes.get('/events' , DashboardController.getAllEvents);
routes.get('/event/:event_id' , DashboardController.getEventById);

//events
routes.post('/event/create' ,upload.single("thumbnail") , EventController.createEvent);
routes.delete('/event/:eventId' , EventController.deleteEvents);

//Login
routes.post('/login' , LoginController.store);

module.exports = routes;