// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const httpResponse = require('../utils/http-response');

// Model
const RoomType = require('../models/room-types.model');

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
 * Register roomType in db.
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

        // Create roomType in database
        let roomType = await RoomType.create({
            name: req.body.name,
            icon: image,
            tasks: JSON.parse(req.body.tasks),
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create roomType data to return
        let roomTypeToFront = {
            _id: roomType._id,
            _createdAt: roomType._createdAt,
            name: roomType.name,
            icon: roomType.icon,
            tasks: roomType.tasks,
        };

        res.send(httpResponse.ok('RoomType created successfuly', roomTypeToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one roomType by id.
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

        // Get roomType by id
        let roomType = await RoomType.findById(req.params.id)
            .populate('tasks')
            .exec();

        // Check if roomType was removed
        if (roomType._deletedAt) throw new Error('RoomType removed');

        // Create roomType data to return
        let roomTypeToFront = {
            _id: roomType._id,
            _createdAt: roomType._createdAt,
            name: roomType.name,
            icon: roomType.icon,
            tasks: roomType.tasks,
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('RoomType returned successfully', roomTypeToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all roomTypes.
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

        // Get all roomTypes
        let roomTypes = await RoomType.find({
            _deletedAt: null
        })
            .populate('tasks')
            .exec();

        // Create roomType data to return
        const roomTypesToFront = roomTypes.map(roomType => {
            return {
                _id: roomType._id,
                _createdAt: roomType._createdAt,
                name: roomType.name,
                icon: roomType.icon,
                tasks: roomType.tasks,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('RoomTypes returned successfully', roomTypesToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a roomType.
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
            tasks: JSON.parse(req.body.tasks),
        };
        if (image) {
            formUpdated['icon'] = image;
        }

        // Update roomType data
        let roomType = await RoomType.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create roomType data to return
        let roomTypeToFront = {
            _id: roomType._id,
            _createdAt: roomType._createdAt,
            name: roomType.name,
            icon: roomType.icon,
            tasks: roomType.tasks,
        };

        res.send(httpResponse.ok('RoomType updated successfuly', roomTypeToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a roomType.
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

        // Delete roomType by id
        await RoomType.findByIdAndDelete(req.params.id);
        // await RoomType.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('RoomType deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};