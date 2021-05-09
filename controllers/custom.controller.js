// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

// Model
const Custom = require('../models/custom.model');

/**
 * Register custom in db.
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

        // Create custom in database
        let custom = await Custom.create({
            module: req.body.module,
            user: req.body.user,
            data: req.body.data,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create custom data to return
        let customToFront = {
            _id: custom._id,
            _createdAt: custom._createdAt,
            module: custom.module,
            user: custom.user,
            data: custom.data,
        };

        res.send(httpResponse.ok('Custom created successfuly', customToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one custom by id.
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

        // Get custom by id
        let custom = await Custom.findById(req.params.id);

        // Check if custom was removed
        if (custom._deletedAt) throw new Error('Custom removed');

        // Create custom data to return
        let customToFront = {
            _id: custom._id,
            _createdAt: custom._createdAt,
            module: custom.module,
            user: custom.user,
            data: custom.data,
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Custom returned successfully', customToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all custom.
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

        // Get all custom
        let custom = await Custom.find({
            _deletedAt: null,
        });

        // Create custom data to return
        const customToFront = custom.map(custom => {
            return {
                _id: custom._id,
                _createdAt: custom._createdAt,
                module: custom.module,
                user: custom.user,
                data: custom.data,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Custom returned successfully', customToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a custom.
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

        // Create custom in database
        let formUpdated = { ...req.body };

        // Update custom data
        let custom = await Custom.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create custom data to return
        let customToFront = {
            _id: custom._id,
            _createdAt: custom._createdAt,
            module: custom.module,
            user: custom.user,
            data: custom.data,
        };

        res.send(httpResponse.ok('Custom updated successfuly', customToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a custom.
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

        // Delete custom by id
        await Custom.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Custom deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};