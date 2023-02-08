const mongoose = require('mongoose');

const lokaleSchema = new mongoose.Schema({
    navn: String,
    pris: Number,
    beskrivelse: String,
    bilder: [String],
    lokaleTyper: [String],
    muligheter: [String],
    gjennomsnittligRating: Number,
    eier: {
        _id: mongoose.Schema.Types.ObjectId,
        navn: String,
        profilBilde: String,
    },
    tidspunkt: {
        dager: [String],
        start: String,
        slutt: String,
    },
    geoLokasjon: {
        addresse: String,
        by: String,
        koordinater: {
            lat: Number,
            lng: Number,
        },
    },
    annmelderlser: [
        {
            navn: String,
            profilBilde: String,
            rating: Number,
            dato: String,
            tekst: String,
        }
    ],



}, { timestamps: true });

module.exports = mongoose.model('Lokale', lokaleSchema);