const mongoose = require('mongoose')

const progressSchema = mongoose.Schema({
    id: Number,
    required: true,
},{
    date: String,
    required: true
}, {
    exercises: String,
    required: true,
}, {
    protein : Number,
    required : true
})

module.exports = mongoose.model('progressModel', progressSchema);