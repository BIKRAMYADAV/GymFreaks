const mongoose = require('mongoose')

const progressSchema = mongoose.Schema(
    {
         date: {
        type: String,
        required: true
    },
    exercises: {
        type: String,
        required: true
    },
    protein: {
        type: Number,
        required: true
    }
    }
)

module.exports = mongoose.model('progressModel', progressSchema);