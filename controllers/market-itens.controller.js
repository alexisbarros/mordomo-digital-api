// Modules
const mongoose = require('mongoose');

// Model
const MarketItem = require('../models/market-itens.model');

/**
 * Register marketItem in db.
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

        // Create marketItem in database
        let marketItem = await MarketItem.create({
            name: req.body.name,
            type: req.body.type,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketItem data to return
        let roomTypeToFront = {
            _id: marketItem._id,
            _createdAt: marketItem._createdAt,
            name: marketItem.name,
            type: marketItem.type,
        };

        console.info('MarketItem created successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'MarketItem created successfuly',
            code: 200
        });

    } catch (err) {

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
 * Get one marketItem by id.
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

        // Get marketItem by id
        let marketItem = await MarketItem.findById(req.params.id);

        // Check if marketItem was removed
        if (marketItem._deletedAt) throw { message: 'MarketItem removed' };

        // Create marketItem data to return
        let roomTypeToFront = {
            _id: marketItem._id,
            _createdAt: marketItem._createdAt,
            name: marketItem.name,
            type: marketItem.type
        };

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MarketItem returned successfully');
        res.send({
            data: roomTypeToFront,
            message: 'MarketItem returned successfully',
            code: 200
        });

    } catch (err) {

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
 * Get all marketItens.
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

        // Get all marketItens
        let marketItens = await MarketItem.find({});

        // Filter marketItem tha wasnt removed
        let roomTypesToFront = marketItens.filter(marketItem => !marketItem._deletedAt);

        // Create marketItem data to return
        roomTypesToFront = roomTypesToFront.map(marketItem => {
            return {
                _id: marketItem._id,
                _createdAt: marketItem._createdAt,
                name: marketItem.name,
                type: marketItem.type
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MarketItens returned successfully');
        res.send({
            data: roomTypesToFront,
            message: 'MarketItens returned successfully',
            code: 200
        });

    } catch (err) {

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
 * Update a marketItem.
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

        // Update marketItem data
        let marketItem = await MarketItem.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketItem data to return
        let roomTypeToFront = {
            _id: marketItem._id,
            _createdAt: marketItem._createdAt,
            name: marketItem.name,
            type: marketItem.type
        };

        console.info('MarketItem updated successfuly');
        res.send({
            data: roomTypeToFront,
            message: 'MarketItem updated successfuly',
            code: 200
        });

    } catch (err) {

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
 * Delete a marketItem.
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

        // Delete marketItem by id
        await MarketItem.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MarketItem deleted successfuly');
        res.send({
            data: {},
            message: 'MarketItem deleted successfuly',
            code: 200
        });

    } catch (err) {

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