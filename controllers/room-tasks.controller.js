// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');

// Model
const RoomTask = require('../models/room-tasks.modal');

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
        });
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create roomTask data to return
        let roomTaskToFront = {
            _id: roomTask._id,
            _createdAt: roomTask._createdAt,
            name: roomTask.name,
            icon: roomTask.icon,
        };
        
        console.info('RoomTask created successfuly');
        res.send({
            data: roomTaskToFront,
            message: 'RoomTask created successfuly',
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
        if(roomTask._deletedAt) throw { message: 'RoomTask removed' };

        // Create roomTask data to return
        let roomTaskToFront = {
            _id: roomTask._id,
            _createdAt: roomTask._createdAt,
            name: roomTask.name,
            icon: roomTask.icon
        };
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('RoomTask returned successfully');
        res.send({
            data: roomTaskToFront,
            message: 'RoomTask returned successfully',
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
        let roomTasks = await RoomTask.find({});

        // Filter roomTask tha wasnt removed
        let roomTasksToFront = roomTasks.filter(roomTask => !roomTask._deletedAt);

        // Create roomTask data to return
        roomTasksToFront = roomTasksToFront.map(roomTask => {
            return {
                _id: roomTask._id,
                _createdAt: roomTask._createdAt,
                name: roomTask.name,
                icon: roomTask.icon
            };
        });
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('RoomTasks returned successfully');
        res.send({
            data: roomTasksToFront,
            message: 'RoomTasks returned successfully',
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

        let formUpdated = { ...req.body };
    
        // Update roomTask data
        let roomTask = await RoomTask.findByIdAndUpdate(req.params.id, formUpdated);
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create roomTask data to return
        let roomTaskToFront = {
            _id: roomTask._id,
            _createdAt: roomTask._createdAt,
            name: roomTask.name,
            icon: roomTask.icon
        };
        
        console.info('RoomTask updated successfuly');
        res.send({
            data: roomTaskToFront,
            message: 'RoomTask updated successfuly',
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
        await RoomTask.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });
    
        // Disconnect to database
        await mongoose.disconnect();
    
        console.info('RoomTask deleted successfuly');
        res.send({
            data: {},
            message: 'RoomTask deleted successfuly',
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