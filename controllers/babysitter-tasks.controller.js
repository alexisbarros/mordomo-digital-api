// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

// Model
const BabysitterTask = require('../models/babysitter-tasks.model');

/**
 * Register babysitterTask in db.
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

        // Create babysitterTask in database
        let babysitterTask = await BabysitterTask.create({
            name: req.body.name,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create babysitterTask data to return
        let babysitterTaskToFront = {
            _id: babysitterTask._id,
            _createdAt: babysitterTask._createdAt,
            name: babysitterTask.name,
        };

        res.send(httpResponse.ok('BabysitterTask created successfuly', babysitterTaskToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one babysitterTask by id.
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

        // Get babysitterTask by id
        let babysitterTask = await BabysitterTask.findById(req.params.id);

        // Check if babysitterTask was removed
        if (babysitterTask._deletedAt) throw new Error('BabysitterTask removed');

        // Create babysitterTask data to return
        let babysitterTaskToFront = {
            _id: babysitterTask._id,
            _createdAt: babysitterTask._createdAt,
            name: babysitterTask.name
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('BabysitterTask returned successfully', babysitterTaskToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all babysitterTasks.
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

        // Get all babysitterTasks
        let babysitterTasks = await BabysitterTask.find({
            _deletedAt: null,
        });

        // Create babysitterTask data to return
        const babysitterTasksToFront = babysitterTasks.map(babysitterTask => {
            return {
                _id: babysitterTask._id,
                _createdAt: babysitterTask._createdAt,
                name: babysitterTask.name
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('BabysitterTasks returned successfully', babysitterTasksToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a babysitterTask.
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

        // Update babysitterTask data
        let babysitterTask = await BabysitterTask.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create babysitterTask data to return
        let babysitterTaskToFront = {
            _id: babysitterTask._id,
            _createdAt: babysitterTask._createdAt,
            name: babysitterTask.name,
        };

        res.send(httpResponse.ok('BabysitterTask updated successfuly', babysitterTaskToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a babysitterTask.
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

        // Delete babysitterTask by id
        await BabysitterTask.findByIdAndDelete(req.params.id);
        // await BabysitterTask.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('BabysitterTask deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};