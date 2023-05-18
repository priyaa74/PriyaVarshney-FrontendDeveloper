const mongoose= require('mongoose');

async function connectDb(){
    const result= await  mongoose.connect('mongodb://127.0.0.1:27017/brainStormForce');
  return result;
  }
module.exports= connectDb;
