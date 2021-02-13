// Modules
const mongoose = require('mongoose');

// Model
const RoomMarketItem = require('../models/room-market-itens.modal');

/**
 * Register roomMarketItem in db.
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

        // Create roomMarketItem in database
        let roomMarketItem = await RoomMarketItem.create({
            name: req.body.name,
            type: req.body.type,
        });
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create roomMarketItem data to return
        let roomTypeToFront = {
            _id: roomMarketItem._id,
            _createdAt: roomMarketItem._createdAt,
            name: roomMarketItem.name,
            type: roomMarketItem.type,
        };
        
        console.info('RoomMarketItem created successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'RoomMarketItem created successfuly',
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
 * Get one roomMarketItem by id.
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
        
        // Get roomMarketItem by id
        let roomMarketItem = await RoomMarketItem.findById(req.params.id);
        
        // Check if roomMarketItem was removed
        if(roomMarketItem._deletedAt) throw { message: 'RoomMarketItem removed' };

        // Create roomMarketItem data to return
        let roomTypeToFront = {
            _id: roomMarketItem._id,
            _createdAt: roomMarketItem._createdAt,
            name: roomMarketItem.name,
            type: roomMarketItem.type
        };
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('RoomMarketItem returned successfully');
        res.send({
            data: roomTypeToFront,
            message: 'RoomMarketItem returned successfully',
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
 * Get all roomMarketItens.
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
        
        // Get all roomMarketItens
        let roomMarketItens = await RoomMarketItem.find({});

        // Filter roomMarketItem tha wasnt removed
        let roomTypesToFront = roomMarketItens.filter(roomMarketItem => !roomMarketItem._deletedAt);

        // Create roomMarketItem data to return
        roomTypesToFront = roomTypesToFront.map(roomMarketItem => {
            return {
                _id: roomMarketItem._id,
                _createdAt: roomMarketItem._createdAt,
                name: roomMarketItem.name,
                type: roomMarketItem.type
            };
        });
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('RoomMarketItens returned successfully');
        res.send({
            data: roomTypesToFront,
            message: 'RoomMarketItens returned successfully',
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
 * Update a roomMarketItem.
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
    
        // Update roomMarketItem data
        let roomMarketItem = await RoomMarketItem.findByIdAndUpdate(req.params.id, formUpdated);
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create roomMarketItem data to return
        let roomTypeToFront = {
            _id: roomMarketItem._id,
            _createdAt: roomMarketItem._createdAt,
            name: roomMarketItem.name,
            type: roomMarketItem.type
        };
        
        console.info('RoomMarketItem updated successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'RoomMarketItem updated successfuly',
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
 * Delete a roomMarketItem.
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
        
        // Delete roomMarketItem by id
        await RoomMarketItem.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });
    
        // Disconnect to database
        await mongoose.disconnect();
    
        console.info('RoomMarketItem deleted successfuly');
        res.send({
            data: {},
            message: 'RoomMarketItem deleted successfuly',
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