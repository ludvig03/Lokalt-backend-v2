const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser, createUser, updateUser, getUserByAuth0Id, registerUserBYAuth0Id } = require('../controllers/brukerController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/auth0/:id', getUserByAuth0Id);
router.post('/registerBruker', registerUserBYAuth0Id);

module.exports = router;