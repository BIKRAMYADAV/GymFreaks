const mongoose = require('mongoose')


const mongoConnect = async (URI) => {
 try{
       const connected =  await mongoose.connect(URI);
       if(connected){
        console.log('successfully connected to the database');
       }
    
 } catch (error){
    console.error('There was an error in connecting to the database: ',error);
 }
}

module.exports = mongoConnect