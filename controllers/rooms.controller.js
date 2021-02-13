// Modules
const mongoose = require('mongoose');

// Model
const Room = require('../models/rooms.model');
const RoomType = require('../models/room-types.model');
const RoomTask = require('../models/room-tasks.modal');

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
        
        console.info('Room created successfuly');
        res.send({
            data: roomToFront,
            message: 'Room created successfuly',
            code: 200
        });

    } catch(err) {

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
        let room = await Room.findById(req.params.id);
        
        // Check if room was removed
        if(room._deletedAt) throw { message: 'Room removed' };

        // Get roomType
        let roomType = await RoomType.findById(room.roomType);

        // Get all tasks
        let tasksFromDb = await RoomTask.find();
        let tasks = room.tasks.map(el => {
            let data = tasksFromDb.find(t => t._id === el.task);
            console.log(data);
            return {
                ...el,
                data
            }
        });

        // Create room data to return
        let roomToFront = {
            _id: room._id,
            _createdAt: room._createdAt,
            name: room.name,
            roomType: roomType,
            tasks: tasks,
            user: room.user
        };
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('Room returned successfully');
        res.send({
            data: roomToFront,
            message: 'Room returned successfully',
            code: 200
        });

    } catch(err) {

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
            user: req.params.id
        });

        // Filter room tha wasnt removed
        let roomsToFront = rooms.filter(room => !room._deletedAt);

        // Create room data to return
        roomsToFront = roomsToFront.map(async room => {
            
            // Get roomType
            let roomType = await RoomType.findById(room.roomType);

            // Get all tasks
            let tasks = room.tasks.map(async el => {
                return {
                    ...el, 
                    data: await RoomTask.findById(el.task)
                }
            });

            return {
                _id: room._id,
                _createdAt: room._createdAt,
                name: room.name,
                roomType: roomType,
                tasks: tasks,
                user: room.user,
            };
        });
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('Rooms returned successfully');
        res.send({
            data: roomsToFront,
            message: 'Rooms returned successfully',
            code: 200
        });

    } catch(err) {

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
        
        console.info('Room updated successfuly');
        res.send({
            data: roomToFront,
            message: 'Room updated successfuly',
            code: 200
        });

    } catch(err) {

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
        await Room.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });
    
        // Disconnect to database
        await mongoose.disconnect();
    
        console.info('Room deleted successfuly');
        res.send({
            data: {},
            message: 'Room deleted successfuly',
            code: 200
        });
        
    } catch(err) {

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