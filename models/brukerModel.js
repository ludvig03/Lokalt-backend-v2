const mongoose = require('mongoose');

const brukerSchema = new mongoose.Schema({
    utleier: Boolean,
    navn: String,
    epost: String,
    profilBilde: String,
    auth0Id: String,
    lokaler: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    favoritter: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    samtaler: [{
        _id: mongoose.Schema.Types.ObjectId,
        tittel: String,
        bilde: String,
        utleier: Boolean,
    }],


}, { timestamps: true });

module.exports = mongoose.model('Bruker', brukerSchema);