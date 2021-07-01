// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

// Model
const Room = require('../models/rooms.model');

/**
 * Register room in db.
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

        // Create room in database
        let room = await Room.create({
            name: req.body.name,
            roomType: req.body.roomType,
            tasks: req.body.tasks,
            user: req.body.user,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create room data to return
        let roomToFront = {
            _id: room._id,
            _createdAt: room._createdAt,
            name: room.name,
            roomType: room.roomType,
            tasks: room.tasks,
            user: room.user,
        };

        res.send(httpResponse.ok('Room created successfuly', roomToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Register many rooms in db.
 * @param {*} req 
 * @param {*} res 
 */
exports.createMany = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Create many rooms in database
        let room = await Room.insertMany(req.body.arrayOfRooms);

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Room created successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one room by id.
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

        // Get room by id
        let room = await Room.findById(req.params.id)
            .populate('roomType')
            .populate({
                path: 'tasks',
                populate: {
                    path: 'task'
                }
            }).exec();

        // Check if room was removed
        if (room._deletedAt) throw new Error('Room removed');

        // Remove db deleted tasks
        let tasks = room.tasks.filter(el => !el._deletedAt);

        // Create room data to return
        let roomToFront = {
            _id: room._id,
            _createdAt: room._createdAt,
            name: room.name,
            roomType: room.roomType,
            tasks: tasks,
            user: room.user
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Room returned successfully', roomToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all rooms from a user.
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

        // Get all rooms
        let rooms = await Room.find({
            user: req.params.id,
            _deletedAt: null,
        })
            .populate('roomType')
            .populate({
                path: 'tasks',
                populate: {
                    path: 'task'
                }
            }).exec();

        // Create room data to return
        const roomsToFront = rooms.map(room => {

            // Remove db deleted tasks
            let tasks = room.tasks.filter(el => !el._deletedAt);

            return {
                _id: room._id,
                _createdAt: room._createdAt,
                name: room.name,
                roomType: room.roomType,
                tasks: tasks,
                user: room.user,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Rooms returned successfully', roomsToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a room.
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

        // Update room data
        let room = await Room.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create room data to return
        let roomToFront = {
            _id: room._id,
            _createdAt: room._createdAt,
            name: room.name,
            roomType: room.roomType,
            tasks: room.tasks,
            user: room.user
        };

        res.send(httpResponse.ok('Room updated successfuly', roomToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a room.
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

        // Delete room by id
        await Room.findByIdAndDelete(req.params.id);
        // await Room.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Room deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};