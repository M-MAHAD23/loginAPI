const mongoose = require('mongoose')

const staffSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name is REQUIRED"]
    },
    password:{
        type: String,
        required: [true,"Password is REQUIRED"]
    },
    role:{
        type: String,
        required: [true,"Role is REQUIRED"]
    },
})

module.exports = mongoose.model('staff',staffSchema)