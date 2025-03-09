const mongoose = require('mongoose');
let URL = "mongodb://127.0.0.1:27017/ScholarBloom";


const connectDB = async()=>{
    try{
    await mongoose.connect(URL);
    console.log("Connected to Database");
}
catch(error){
    console.log(error.message)
    console.log(e);
    process.exit(1);
}
};
connectDB();
module.exports = connectDB;