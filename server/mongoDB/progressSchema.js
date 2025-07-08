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
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    }
)

module.exports = mongoose.model('progressModel', progressSchema);