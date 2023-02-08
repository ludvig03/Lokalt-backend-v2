const express = require('express')
const router = express.Router()
const { getMeldinger, getMeldingerByBrukere, getMeldingById, postMelding } = require('../controllers/meldingController')

router.get('/', getMeldinger)
router.get('/brukere', getMeldingerByBrukere)
router.get('/:id', getMeldingById)
router.post('/', postMelding)

module.exports = router