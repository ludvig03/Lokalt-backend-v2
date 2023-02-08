const mongoose = require('mongoose');

const meldingSchema = new mongoose.Schema({
    brukere: [String],
    antall_meldinger: Number,
    meldinger: [
        {
            sender: String,
            melding: String,
            tid: String
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Melding', meldingSchema);

