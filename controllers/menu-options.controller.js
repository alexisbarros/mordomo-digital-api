// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

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
        let menuOptionToFront = {
            _id: menuOption._id,
            _createdAt: menuOption._createdAt,
            name: menuOption.name,
        };

        res.send(httpResponse.ok('MenuOption created successfuly', menuOptionToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        if (menuOption._deletedAt) throw new Error('MenuOption removed');

        // Create menuOption data to return
        let menuOptionToFront = {
            _id: menuOption._id,
            _createdAt: menuOption._createdAt,
            name: menuOption.name
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MenuOption returned successfully', menuOptionToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        let menuOptions = await MenuOption.find({
            _deletedAt: null,
        });

        // Create menuOption data to return
        const menuOptionsToFront = menuOptions.map(menuOption => {
            return {
                _id: menuOption._id,
                _createdAt: menuOption._createdAt,
                name: menuOption.name
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MenuOptions returned successfully', menuOptionsToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        let menuOptionToFront = {
            _id: menuOption._id,
            _createdAt: menuOption._createdAt,
            name: menuOption.name,
        };

        res.send(httpResponse.ok('MenuOption updated successfuly', menuOptionToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        await MenuOption.findByIdAndDelete(req.params.id);
        // await MenuOption.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MenuOption deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};