const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        required: true
    },
    phone : {
        type : String
    },
    bio : {
        type : String
    },
    profileImage : {
        type : String
    }
})

module.exports = mongoose.model('profileModel', profileSchema);