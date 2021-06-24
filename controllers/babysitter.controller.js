// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

// Model
const Babysitter = require('../models/babysitter.model');

/**
 * Register babysitter in db.
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

        // Create babysitter in database
        let babysitter = await Babysitter.create({
            fullDate: req.body.fullDate,
            tasks: req.body.tasks,
            user: req.body.user,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create babysitter data to return
        let babysitterToFront = {
            _id: babysitter._id,
            _createdAt: babysitter._createdAt,
            fullDate: babysitter.fullDate,
            tasks: babysitter.tasks,
            user: babysitter.user,
        };

        res.send(httpResponse.ok('Babysitter created successfuly', babysitterToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one babysitter by id.
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

        // Get babysitter by id
        let babysitter = await Babysitter.findById(req.params.id)
            .populate('tasks').exec();

        // Check if babysitter was removed
        if (babysitter._deletedAt) throw new Error('Babysitter removed');

        // Create babysitter data to return
        let babysitterToFront = {
            _id: babysitter._id,
            _createdAt: babysitter._createdAt,
            fullDate: babysitter.fullDate,
            tasks: babysitter.tasks,
            user: babysitter.user
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Babysitter returned successfully', babysitterToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get one babysitter by fullDate.
 * @param {*} req 
 * @param {*} res 
 */
exports.readOneByFullDate = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Get babysitter by id
        let babysitter = await Babysitter.findOne({
            user: req.params.id,
            _deletedAt: null,
            fullDate: req.params.fullDate,
        })
            .populate('tasks').exec();

        // Check if babysitter was removed
        if (babysitter._deletedAt) throw new Error('Babysitter removed');

        // Create babysitter data to return
        let babysitterToFront = {
            _id: babysitter._id,
            _createdAt: babysitter._createdAt,
            fullDate: babysitter.fullDate,
            tasks: babysitter.tasks,
            user: babysitter.user
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Babysitter returned successfully', babysitterToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all babysitters from a user.
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

        // Get all babysitters
        let babysitters = await Babysitter.find({
            user: req.params.id,
            _deletedAt: null,
        })
            .populate('tasks').exec();

        // Create babysitter data to return
        const babysittersToFront = babysitters.map(babysitter => {

            return {
                _id: babysitter._id,
                _createdAt: babysitter._createdAt,
                fullDate: babysitter.fullDate,
                tasks: babysitter.tasks,
                user: babysitter.user,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Babysitters returned successfully', babysittersToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a babysitter.
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

        // Update babysitter data
        let babysitter = await Babysitter.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create babysitter data to return
        let babysitterToFront = {
            _id: babysitter._id,
            _createdAt: babysitter._createdAt,
            fullDate: babysitter.fullDate,
            tasks: babysitter.tasks,
            user: babysitter.user
        };

        res.send(httpResponse.ok('Babysitter updated successfuly', babysitterToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a babysitter.
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

        // Delete babysitter by id
        await Babysitter.findByIdAndDelete(req.params.id);
        // await Babysitter.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Babysitter deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};