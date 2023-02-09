const mongoose = require('mongoose');

const lokaleSchema = new mongoose.Schema({
    navn: String,
    pris: Number,
    beskrivelse: String,
    bilder: [String],
    lokaleTyper: [String],
    muligheter: [String],
    gjennomsnittligRating: Number,
    antallPersoner: Number,
    kvadratmeter: Number,
    leieTider: {
        mandag: {
            start: String,
            slutt: String,
        },
        tirsdag: {
            start: String,
            slutt: String,
        },
        onsdag: {
            start: String,
            slutt: String
        },
        torsdag: {
            start: String,
            slutt: String
        },
        fredag: {
            start: String,
            slutt: String
        },
        lørdag: {
            start: String,
            slutt: String
        },
        søndag: {
            start: String,
            slutt: String
        }
    },
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