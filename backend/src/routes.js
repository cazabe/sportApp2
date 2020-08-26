const express = require('express');
const multer = require('multer');
const verifyToken = require('./config/verifyToken');

const routes = express.Router();

const UserController = require('./controllers/User.controller');
const EventController = require('./controllers/Events.controller');
const DashboardController = require('./controllers/Dashboard.controller');
const LoginController = require('./controllers/Login.controller');
const RegistrationController = require('./controllers/Registration.controller');
const ApprovalController = require('./controllers/Approval.controller');
const RejectionController = require('./controllers/Rejection.controller');

//configurations for handeling the pictures or thumbnail
const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

routes.get('/status' , (req,res)=>{
    res.send({status:200});
})

//Registration to an event with user id and event id and approve that registration
routes.post('/registration/:eventId' ,verifyToken, RegistrationController.createRegistration );
routes.get('/registration/:registration_id' , RegistrationController.getRegistration );
routes.get('/registration' , verifyToken, RegistrationController.getMyRegistration);
routes.post('/registration/:resgistration_id/approval' ,verifyToken, ApprovalController.approval);
routes.post('/registration/:resgistration_id/rejection' ,verifyToken, RejectionController.rejection);

//user
routes.post('/user/register' , UserController.createUser);
routes.get('/user/:userId' , UserController.getUserById);

//Dashboard
routes.get('/events/:sport' ,verifyToken, DashboardController.getAllEvents);
routes.get('/events',verifyToken, DashboardController.getAllEvents);
routes.get('/users/myevents' ,verifyToken, DashboardController.getEventsByUserId);
routes.get('/event/:event_id' ,verifyToken, DashboardController.getEventById);

//events
routes.post('/event/create' ,verifyToken,upload.single("thumbnail") , EventController.createEvent);
routes.delete('/event/:eventId' , verifyToken,EventController.deleteEvents);

//Login
routes.post('/login' , LoginController.store);

module.exports = routes;