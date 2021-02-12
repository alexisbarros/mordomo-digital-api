// Modules
var mongoose = require('mongoose');

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
        
        console.info('User created successfuly');
        return({
            data: userToFront,
            message: 'User created successfuly',
            code: 200
        });

    } catch(err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        return({
            data: {},
            message: err.message,
            code: 400
        });

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
        if(user._deletedAt) throw { message: 'User removed' };

        // Create user data to return
        let userToFront = {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        };
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('User returned successfully');
        return({
            data: userToFront,
            message: 'User returned successfully',
            code: 200
        });

    } catch(err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        return({
            data: {},
            message: err.message,
            code: 400
        });

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
        let users = await User.find({});

        // Filter user tha wasnt removed
        let usersToFront = users.filter(user => !user._deletedAt);

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
        
        console.info('Users returned successfully');
        return({
            data: usersToFront,
            message: 'Users returned successfully',
            code: 200
        });

    } catch(err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        return({
            data: [],
            message: err.message,
            code: 400
        });

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
        
        console.info('User updated successfuly');
        return({
            data: userToFront,
            message: 'User updated successfuly',
            code: 200
        });

    } catch(err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        return({
            data: [],
            message: err.message,
            code: 400
        });

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
    
        console.info('User deleted successfuly');
        return({
            data: {},
            message: 'User deleted successfuly',
            code: 200
        });
        
    } catch(err) {

        // Disconnect to database
        await mongoose.disconnect();
        
        console.error(err.message);
        return({
            data: [],
            message: err.message,
            code: 400
        });

    }

};