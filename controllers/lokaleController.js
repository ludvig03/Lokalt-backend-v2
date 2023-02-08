const asyncHandler = require('express-async-handler');
const Lokale = require('../models/lokaleModel');

// @desc    Fetch all lokaler
// @route   GET /api/lokaler
// @access  Public

const getLokaler = asyncHandler(async (req, res) => {
    const lokaler = await Lokale.find({});
    res.json(lokaler);
})

// @desc    Fetch single lokale
// @route   GET /api/lokaler/:id
// @access  Public

const getLokaleById = asyncHandler(async (req, res) => {
    const lokale = await Lokale.findById(req.params.id);
    if (lokale) {
        res.json(lokale);
    } else {
        res.status(404);
        throw new Error('Lokale not found');
    }
})

// @desc    Delete lokale
// @route   DELETE /api/lokaler/:id
// @access  Private/Admin

const deleteLokale = asyncHandler(async (req, res) => {
    const lokale = await Lokale.findById(req.params.id);
    if (lokale) {
        await lokale.remove();
        res.json({ message: 'Lokale removed' });
    } else {
        res.status(404);
        throw new Error('Lokale not found');
    }
})

// @desc    Create lokale
// @route   POST /api/lokaler
// @access  Private/Admin

const createLokale = asyncHandler(async (req, res) => {
    const lokale = new Lokale({
        navn: req.body.navn,
        pris: req.body.pris,
        beskrivelse: req.body.beskrivelse,
        bilder: req.body.bilder,
        lokaleTyper: req.body.lokaleTyper,
        muligheter: req.body.muligheter,
        eier: {
            _id: req.body.eier._id,
            navn: req.body.eier.navn,
            profilBilde: req.body.eier.profilBilde,
        },
        tidspunkt: {
            dager: req.body.tidspunkt.dager,
            start: req.body.tidspunkt.start,
            slutt: req.body.tidspunkt.slutt,
        },
        geoLokasjon: {
            addresse: req.body.geoLokasjon.addresse,
            by: req.body.geoLokasjon.by,
            koordinater: req.body.geoLokasjon.koordinater
        }
    })

    const createdLokale = await lokale.save();
    res.status(201).json(createdLokale);

})


const updateLokale = asyncHandler(async (req, res) => {
    const lokale = await Bruker.findById(req.params.id);

})


module.exports = {
    getLokaler,
    getLokaleById,
    deleteLokale,
    createLokale,
}



    


