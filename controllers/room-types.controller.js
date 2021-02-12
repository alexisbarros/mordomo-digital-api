// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');

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
        });
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create roomType data to return
        let roomTypeToFront = {
            _id: roomType._id,
            _createdAt: roomType._createdAt,
            name: roomType.name,
            icon: roomType.icon,
        };
        
        console.info('RoomType created successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'RoomType created successfuly',
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
        let roomType = await RoomType.findById(req.params.id);
        
        // Check if roomType was removed
        if(roomType._deletedAt) throw { message: 'RoomType removed' };

        // Create roomType data to return
        let roomTypeToFront = {
            _id: roomType._id,
            _createdAt: roomType._createdAt,
            name: roomType.name,
            icon: roomType.icon
        };
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('RoomType returned successfully');
        res.send({
            data: roomTypeToFront,
            message: 'RoomType returned successfully',
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
        let roomTypes = await RoomType.find({});

        // Filter roomType tha wasnt removed
        let roomTypesToFront = roomTypes.filter(roomType => !roomType._deletedAt);

        // Create roomType data to return
        roomTypesToFront = roomTypesToFront.map(roomType => {
            return {
                _id: roomType._id,
                _createdAt: roomType._createdAt,
                name: roomType.name,
                icon: roomType.icon
            };
        });
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('RoomTypes returned successfully');
        res.send({
            data: roomTypesToFront,
            message: 'RoomTypes returned successfully',
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

        let formUpdated = { ...req.body };
    
        // Update roomType data
        let roomType = await RoomType.findByIdAndUpdate(req.params.id, formUpdated);
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create roomType data to return
        let roomTypeToFront = {
            _id: roomType._id,
            _createdAt: roomType._createdAt,
            name: roomType.name,
            icon: roomType.icon
        };
        
        console.info('RoomType updated successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'RoomType updated successfuly',
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
        await RoomType.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });
    
        // Disconnect to database
        await mongoose.disconnect();
    
        console.info('RoomType deleted successfuly');
        res.send({
            data: {},
            message: 'RoomType deleted successfuly',
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