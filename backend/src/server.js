const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 8000;

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



app.use(cors());
app.use(express.json());

//routes
app.use(routes);


//mongo conecction
try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    console.log('MongoDB conected')
} catch (error) {
    console.log(error);
}
//server
app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`);
})