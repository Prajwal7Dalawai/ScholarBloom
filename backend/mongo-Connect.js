const mongoose = require('mongoose');
require("dotenv").config(); // Load environment variables

const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MongoURL);
    console.log("Connected to Database");
}
catch(error){
    console.log(error.message)
    console.log(error);
    process.exit(1);
}
};
module.exports = connectDB;
