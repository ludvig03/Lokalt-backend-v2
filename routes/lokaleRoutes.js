const express = require('express');
const router = express.Router();
const { getLokaler, getLokaleById, deleteLokale, createLokale, updateLokale, } = require('../controllers/lokaleController');

router.get('/', getLokaler);
router.get('/:id', getLokaleById);
router.delete('/:id', deleteLokale);
router.post('/', createLokale);

module.exports = router;