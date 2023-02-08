const asyncHandler = require('express-async-handler');
const Melding = require('../models/meldingModel');

// @desc    Fetch all meldinger
// @route   GET /api/meldinger
// @access  Public

const getMeldinger = asyncHandler(async (req, res) => {
    const meldinger = await Melding.find({});
    res.json(meldinger);
})

// @desc    Fetch single melding
// @route   GET /api/meldinger/:id
// @access  Public

const getMeldingById = asyncHandler(async (req, res) => {
    const melding = await Melding.findById(req.params.id);
    if (melding) {
        res.json(melding);
    } else {
        res.status(404);
        throw new Error('Melding not found');
    }
})

// @desc    Post single melding
// @route   POST /api/meldinger
// @access  Public

// get melding by users, if messages between the two users exists return the melding instance, include a boolean in the respone that returns true if the person who requests the messages is the person who send the message.
// if the person who requests the messages is the person who send the message, set the boolean to true, else set the boolean to false

const getMeldingerByBrukere = asyncHandler(async (req, res) => {
    const melding = await Melding.findOne({ $or : [{ brukere: [req.body.sender, req.body.mottaker] }, { brukere: [req.body.mottaker, req.body.sender] }]})
    if (melding) {
        res.status(200).json(melding)
    } else {
        res.status(404);
        throw new Error('Melding not found');
    }
})



// post single melding, if melding instance between the two users exist, push to the array of meldinger, else create new melding instance between the users and push to the array of meldinger

const postMelding = asyncHandler(async (req, res) => {
    const melding = await Melding.findOne({ $or : [{ brukere: [req.body.sender, req.body.mottaker] }, { brukere: [req.body.mottaker, req.body.sender] }]})
    if (melding) {
        console.log(melding)
        melding.antall_meldinger += 1;
        melding.meldinger.push({
            sender: req.body.sender,
            mottaker: req.body.mottaker,
            melding: req.body.melding,
            tid: Date.now()
        })
        await melding.save();
        res.json(melding);
    } else {
        const melding = new Melding({
            brukere: [req.body.sender, req.body.mottaker],
            antall_meldinger: 1,
            meldinger: [
                {
                    sender: req.body.sender,
                    mottaker: req.body.mottaker,
                    melding: req.body.melding,
                    tid: Date.now()
                }
            ]
        })
        await melding.save();
        res.json(melding);
    }
})

// export the funcitons

module.exports = {
    getMeldinger,
    getMeldingById,
    postMelding,
    getMeldingerByBrukere
}







