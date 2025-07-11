const mongoose = require('mongoose');

const connectdb = async()=>{
try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected...');
}
catch(e){
    console.log('Error connecting to MongoDB', e);
    process.exit(1);
     }
}

module.exports = connectdb;
