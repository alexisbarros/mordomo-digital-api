// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

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

        res.send(httpResponse.ok('MarketCart created successfuly', marketCartToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        if (marketCart._deletedAt) throw new Error('MarketCart removed');

        // Remove db deleted itens
        let itens = marketCart.itens.filter(el => !el._deletedAt);

        // Create marketCart data to return
        let marketCartToFront = {
            _id: marketCart._id,
            _createdAt: marketCart._createdAt,
            name: marketCart.name,
            itens: itens,
            user: marketCart.user
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketCart returned successfully', marketCartToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
            user: req.params.id,
            _deletedAt: null,
        })
            .populate({
                path: 'itens',
                populate: {
                    path: 'marketItem'
                }
            }).exec();

        // Create marketCart data to return
        const marketCartsToFront = marketCarts.map(marketCart => {

            // Remove db deleted itens
            let itens = marketCart.itens.filter(el => !el._deletedAt);

            return {
                _id: marketCart._id,
                _createdAt: marketCart._createdAt,
                name: marketCart.name,
                itens: itens,
                user: marketCart.user,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketCarts returned successfully', marketCartsToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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

        res.send(httpResponse.ok('MarketCart updated successfuly', marketCartToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        await MarketCart.findByIdAndDelete(req.params.id);
        // await MarketCart.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketCart deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};