const express = require('express');
const multer = require('multer');

const routes = express.Router();

const UserController = require('./controllers/User.controller');
const EventController = require('./controllers/Events.controller');

//configurations for handeling the pictures or thumbnail
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

routes.get('/status' , (req,res)=>{
    res.send({status:200});
})

//user
routes.post('/user/register' , UserController.createUser);
routes.get('/user/:userId' , UserController.getUserById);

//events
routes.post('/event/create' ,upload.single("thumbnail") , EventController.createEvent);


module.exports = routes;