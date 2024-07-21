const express =require('express');
const sequelize=require('./config/connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;


sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>console.log(`Now Listening on ${PORT}`));
});