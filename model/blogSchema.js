const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    Title:{
        type: String,
        required: [true,"Title Name REQUIRED"]
    },
    Description:{
        type: String,
        required: [true,"Description is REQUIRED"]
    },
    img:{
        data: String,
        contentType: String
    }
})

module.exports = mongoose.model('blog',blogSchema)