// Modules
const mongoose = require('mongoose');

// Model
const MenuOption = require('../models/menu-options.model');

/**
 * Register menuOption in db.
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

        // Create menuOption in database
        let menuOption = await MenuOption.create({
            name: req.body.name,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create menuOption data to return
        let roomTypeToFront = {
            _id: menuOption._id,
            _createdAt: menuOption._createdAt,
            name: menuOption.name,
        };

        console.info('MenuOption created successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'MenuOption created successfuly',
            code: 200
        });

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        res.send({
            data: {},
            message: err.message,
            code: 400
        });

    }

};

/**
 * Get one menuOption by id.
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

        // Get menuOption by id
        let menuOption = await MenuOption.findById(req.params.id);

        // Check if menuOption was removed
        if (menuOption._deletedAt) throw { message: 'MenuOption removed' };

        // Create menuOption data to return
        let roomTypeToFront = {
            _id: menuOption._id,
            _createdAt: menuOption._createdAt,
            name: menuOption.name
        };

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MenuOption returned successfully');
        res.send({
            data: roomTypeToFront,
            message: 'MenuOption returned successfully',
            code: 200
        });

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        res.send({
            data: {},
            message: err.message,
            code: 400
        });

    }

}

/**
 * Get all menuOptions.
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

        // Get all menuOptions
        let menuOptions = await MenuOption.find({});

        // Filter menuOption tha wasnt removed
        let roomTypesToFront = menuOptions.filter(menuOption => !menuOption._deletedAt);

        // Create menuOption data to return
        roomTypesToFront = roomTypesToFront.map(menuOption => {
            return {
                _id: menuOption._id,
                _createdAt: menuOption._createdAt,
                name: menuOption.name
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MenuOptions returned successfully');
        res.send({
            data: roomTypesToFront,
            message: 'MenuOptions returned successfully',
            code: 200
        });

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        res.send({
            data: [],
            message: err.message,
            code: 400
        });

    }

};

/**
 * Update a menuOption.
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

        let formUpdated = { ...req.body };

        // Update menuOption data
        let menuOption = await MenuOption.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create menuOption data to return
        let roomTypeToFront = {
            _id: menuOption._id,
            _createdAt: menuOption._createdAt,
            name: menuOption.name,
        };

        console.info('MenuOption updated successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'MenuOption updated successfuly',
            code: 200
        });

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        res.send({
            data: [],
            message: err.message,
            code: 400
        });

    }

};

/**
 * Delete a menuOption.
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

        // Delete menuOption by id
        await MenuOption.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MenuOption deleted successfuly');
        res.send({
            data: {},
            message: 'MenuOption deleted successfuly',
            code: 200
        });

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        console.error(err.message);
        res.send({
            data: [],
            message: err.message,
            code: 400
        });

    }

};