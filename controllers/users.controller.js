// Modules
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

        // Create user in database
        let user = await User.create({
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin || false
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create user data to return
        let userToFront = {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
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
        await User.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('User deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};