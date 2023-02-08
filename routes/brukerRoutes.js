const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser, createUser, updateUser, } = require('../controllers/brukerController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.put('/:id', updateUser);

module.exports = router;