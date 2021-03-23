const mongoose = require('mongoose')

const course = mongoose.model(
    'course',
    new mongoose.Schema({
        name: { type: String, required: true },
        pars: { type: [Number], required: true },
        holedistances_white: { type: [Number], required: true },
        holedistances_yellow: { type: [Number], required: true },
    })
)

module.exports = course
