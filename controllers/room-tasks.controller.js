// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const httpResponse = require('../utils/http-response');

// Model
const RoomTask = require('../models/room-tasks.model');

/**
 * Method to save image in server
 */
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './temp_files');
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.uploadImg = multer({ storage: storage }).single('image');

/**
 * Register roomTask in db.
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

        // Create image buffer to put in mongod
        let image = {
            data: fs.readFileSync(req.file.path),
            type: req.file.mimetype
        }

        // Create roomTask in database
        let roomTask = await RoomTask.create({
            name: req.body.name,
            icon: image,
            defaultFrequency: JSON.parse(req.body.defaultFrequency),
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create roomTask data to return
        let roomTaskToFront = {
            _id: roomTask._id,
            _createdAt: roomTask._createdAt,
            name: roomTask.name,
            icon: roomTask.icon,
            defaultFrequency: roomTask.defaultFrequency,
        };

        res.send(httpResponse.ok('RoomTask created successfuly', roomTaskToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one roomTask by id.
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

        // Get roomTask by id
        let roomTask = await RoomTask.findById(req.params.id);

        // Check if roomTask was removed
        if (roomTask._deletedAt) throw new Error('RoomTask removed');

        // Create roomTask data to return
        let roomTaskToFront = {
            _id: roomTask._id,
            _createdAt: roomTask._createdAt,
            name: roomTask.name,
            icon: roomTask.icon,
            defaultFrequency: roomTask.defaultFrequency,
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('RoomTask returned successfully', roomTaskToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all roomTasks.
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

        // Get all roomTasks
        let roomTasks = await RoomTask.find({
            _deletedAt: null,
        });

        // Create roomTask data to return
        const roomTasksToFront = roomTasks.map(roomTask => {
            return {
                _id: roomTask._id,
                _createdAt: roomTask._createdAt,
                name: roomTask.name,
                icon: roomTask.icon,
                defaultFrequency: roomTask.defaultFrequency,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('RoomTasks returned successfully', roomTasksToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a roomTask.
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

        // Create image buffer to put in mongod
        let image = req.file ? {
            data: fs.readFileSync(req.file.path),
            type: req.file.mimetype
        } : null

        // Create roomTask in database
        let formUpdated = {
            ...req.body,
            defaultFrequency: JSON.parse(req.body.defaultFrequency),
        };
        if (image) {
            formUpdated['icon'] = image;
        }

        // Update roomTask data
        let roomTask = await RoomTask.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create roomTask data to return
        let roomTaskToFront = {
            _id: roomTask._id,
            _createdAt: roomTask._createdAt,
            name: roomTask.name,
            icon: roomTask.icon,
            defaultFrequency: roomTask.defaultFrequency,
        };

        res.send(httpResponse.ok('RoomTask updated successfuly', roomTaskToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a roomTask.
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

        // Delete roomTask by id
        await RoomTask.findByIdAndDelete(req.params.id);
        // await RoomTask.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('RoomTask deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};