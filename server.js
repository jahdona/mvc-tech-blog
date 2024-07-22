const express =require('express');
const path = require('path');
const routes =require('./controllers');
const sequelize=require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// use routes

app.use(routes);
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>console.log(`Now Listening on ${PORT}`));
});