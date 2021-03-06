// Modules
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

// Model
const User = require('../models/users.model');

/**
 * Register user in db.
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Search user
        let localizedUser = await User.findOne({ email: req.body.email });
        if (localizedUser) throw new Error('E-mail já cadastrado');

        // Create user in database
        let user = await User.create({
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin || false
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Generate token
        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        // Create user data to return
        let userToFront = {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
        };

        res.send(httpResponse.ok('User created successfuly', userToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one user by id.
 * @param {*} req 
 * @param {*} res 
 */
exports.readOne = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Get user by id
        let user = await User.findById(req.params.id);

        // Check if user was removed
        if (user._deletedAt) throw new Error('User removed');

        // Create user data to return
        let userToFront = {
            _id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('User returned successfully', userToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get one user by email.
 * @param {*} req 
 * @param {*} res 
 */
exports.readOneByEmail = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Get user by email
        let user = await User.find({
            email: req.params.email,
            _deletedAt: null
        });

        // Create user data to return
        let userToFront = {
            _id: user && user._id,
            email: user && user.email,
            username: user && user.username,
            isAdmin: user && user.isAdmin
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('User returned successfully', userToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all users.
 * @param {*} req 
 * @param {*} res 
 */
exports.readAll = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Get all users
        let users = await User.find({
            _deletedAt: null
        });

        // Create user data to return
        usersToFront = usersToFront.map(user => {
            return {
                _id: user._id,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Users returned successfully', usersToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a user.
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Update user data
        let user = await User.findByIdAndUpdate(req.params.id, { ...req.body });

        // Disconnect to database
        await mongoose.disconnect();

        // Create user data to return
        let userToFront = {
            _id: user._id,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin
        };

        res.send(httpResponse.ok('User updated successfuly', userToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a user.
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Delete user by id
        await User.findByIdAndDelete(req.params.id);
        // await User.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('User deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};