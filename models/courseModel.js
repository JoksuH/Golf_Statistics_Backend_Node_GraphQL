const mongoose = require('mongoose')

const course = mongoose.model(
    'course',
    new mongoose.Schema({
        name: { type: String, required: true },
        pars: { type: [String], required: true },
    })
)

module.exports = course
