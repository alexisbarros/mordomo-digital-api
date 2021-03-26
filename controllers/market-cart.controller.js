// Modules
const mongoose = require('mongoose');

// Model
const MarketCart = require('../models/market-cart.model');

/**
 * Register marketCart in db.
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

        // Create marketCart in database
        let marketCart = await MarketCart.create({
            name: req.body.name,
            itens: req.body.itens,
            user: req.body.user,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketCart data to return
        let marketCartToFront = {
            _id: marketCart._id,
            _createdAt: marketCart._createdAt,
            name: marketCart.name,
            itens: marketCart.itens,
            user: marketCart.user,
        };

        console.info('MarketCart created successfuly');
        res.send({
            data: marketCartToFront,
            message: 'MarketCart created successfuly',
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
 * Get one marketCart by id.
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

        // Get marketCart by id
        let marketCart = await MarketCart.findById(req.params.id)
            .populate({
                path: 'itens',
                populate: {
                    path: 'marketItem'
                }
            }).exec();

        // Check if marketCart was removed
        if (marketCart._deletedAt) throw { message: 'MarketCart removed' };

        // Remove db deleted itens
        let itens = marketCart.itens.filter(el => !el._deletedAt);

        // Create marketCart data to return
        let marketCartToFront = {
            _id: marketCart._id,
            _createdAt: marketCart._createdAt,
            itens: itens,
            user: marketCart.user
        };

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MarketCart returned successfully');
        res.send({
            data: marketCartToFront,
            message: 'MarketCart returned successfully',
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
 * Get all marketCarts from a user.
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

        // Get all marketCarts
        let marketCarts = await MarketCart.find({
            user: req.params.id
        })
            .populate({
                path: 'itens',
                populate: {
                    path: 'marketItem'
                }
            }).exec();

        // Filter marketCart tha wasnt removed
        let marketCartsToFront = marketCarts.filter(marketCart => !marketCart._deletedAt);

        // Create marketCart data to return
        marketCartsToFront = marketCartsToFront.map(marketCart => {

            // Remove db deleted itens
            let itens = marketCart.itens.filter(el => !el._deletedAt);

            return {
                _id: marketCart._id,
                _createdAt: marketCart._createdAt,
                itens: itens,
                user: marketCart.user,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MarketCarts returned successfully');
        res.send({
            data: marketCartsToFront,
            message: 'MarketCarts returned successfully',
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
 * Update a marketCart.
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

        // Update marketCart data
        let marketCart = await MarketCart.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketCart data to return
        let marketCartToFront = {
            _id: marketCart._id,
            _createdAt: marketCart._createdAt,
            name: marketCart.name,
            itens: marketCart.itens,
            user: marketCart.user
        };

        console.info('MarketCart updated successfuly');
        res.send({
            data: marketCartToFront,
            message: 'MarketCart updated successfuly',
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
 * Delete a marketCart.
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

        // Delete marketCart by id
        await MarketCart.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        console.info('MarketCart deleted successfuly');
        res.send({
            data: {},
            message: 'MarketCart deleted successfuly',
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