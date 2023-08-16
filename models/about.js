const mongoose = require('mongoose')

const about = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    info: {
        type: String,
    },
    aboutme: {
        type: String
    },
    location: { 
        type: String
    },
    nationality: {
        type: String
    },
    study: {
        type: String
    },
    age: {
        type: String
    },
    interests: {
        type: String
    },
    employment: {
        type: String
    }
})

module.exports = new mongoose.model("About", about)