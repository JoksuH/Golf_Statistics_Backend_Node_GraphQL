const mongoose = require('mongoose')

const roundScore = mongoose.model(
    'roundScore',
    new mongoose.Schema({
        coursename: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            required: true,
        },
        holescores: { type: [String], required: true },
        putts: { type: [String] },
        fir: { type: [String] },
        gir: { type: [String] },
        approachdistance: { type: [String] },
        penalties: { type: [String] },
        greenbunkers: { type: [String] },
        fwbunkers: { type: [String] },
        tee: { type: String },
        date: { type: Date, default: Date.now },
    })
)

module.exports = roundScore
