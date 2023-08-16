const mongoose = require('mongoose')

const skill = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true,
        index: true
    },
    text: {
        type: String,
    }
});


module.exports = new mongoose.model("Skill", skill)