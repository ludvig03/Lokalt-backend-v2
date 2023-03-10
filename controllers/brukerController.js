const asyncHandler = require('express-async-handler');
const Bruker = require('../models/brukerModel');

// @desc    Fetch all users
// @route   GET /api/users
// @access  Public

const getUsers = asyncHandler(async (req, res) => {
    const users = await Bruker.find({});
    res.json(users);
})

// @desc    Fetch single user
// @route   GET /api/users/:id
// @access  Public

const getUserById = asyncHandler(async (req, res) => {
    const user = await Bruker.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const getUserByAuth0Id = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const user = await Bruker.findOne({ auth0Id: req.params.id });
    
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    const user = await Bruker.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

// @desc    Create user
// @route   POST /api/users
// @access  Private/Admin

const createUser = asyncHandler(async (req, res) => {
    const user = new Bruker({
        utleier: req.body.utleier,
        navn: req.body.navn,
        epost: req.body.epost,
        profilBilde: req.body.profilBilde,
        auth0Id: req.body.auth0Id,
        lokaler: [],
        favoritter: [],
        samtaler: [],
    })

    const createdUser = await user.save();
    res.status(201).json(createdUser);
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    const user = await Bruker.findById(req.params.id);

    if (user) {
        user.navn = req.body.navn || user.navn;
        user.epost = req.body.epost || user.epost;
        user.auth0Id = req.body.auth0Id || user.auth0Id;
        user.lokaler = req.body.lokaler || user.lokaler;
        user.favoritter = req.body.favoritter || user.favoritter;
        user.samtaler = req.body.samtaler || user.samtaler;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

const registerUserBYAuth0Id = asyncHandler(async (req, res) => {
    const user = new Bruker({
        navn: req.body.navn,
        epost: req.body.epost,
        auth0Id: req.body.auth0Id,
    })

    const createdUser = await user.save();
    res.status(201).json(createdUser);
})





module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser,
    getUserByAuth0Id,
    registerUserBYAuth0Id
}

