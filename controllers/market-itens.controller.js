// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

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
            group: req.body.group,
            user: req.body.user,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketItem data to return
        let marketItemToFront = {
            _id: marketItem._id,
            _createdAt: marketItem._createdAt,
            name: marketItem.name,
            group: marketItem.group,
            type: marketItem.type,
            user: marketItem.user,
        };

        res.send(httpResponse.ok('MarketItem created successfuly', marketItemToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        let marketItem = await MarketItem.findById(req.params.id).populate('group').exec();

        // Check if marketItem was removed
        if (marketItem._deletedAt) throw new Error('MarketItem removed');

        // Create marketItem data to return
        let marketItemToFront = {
            _id: marketItem._id,
            _createdAt: marketItem._createdAt,
            name: marketItem.name,
            type: marketItem.type,
            group: marketItem.group,
            user: marketItem.user,
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketItem returned successfully', marketItemToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        let marketItens = await MarketItem.find({
            _deletedAt: null,
            $or: [
                { 'user': null },
                { 'user': req.params.userId },
            ]
        })
            .populate({ path: 'group', select: '-icon' })
            .exec();

        // Create marketItem data to return
        const marketItensToFront = marketItens.map(marketItem => {
            return {
                _id: marketItem._id,
                _createdAt: marketItem._createdAt,
                name: marketItem.name,
                type: marketItem.type,
                group: marketItem.group,
                user: marketItem.user,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketItens returned successfully', marketItensToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        let marketItemToFront = {
            _id: marketItem._id,
            _createdAt: marketItem._createdAt,
            name: marketItem.name,
            group: marketItem.group,
            type: marketItem.type,
            user: marketItem.user,
        };

        res.send(httpResponse.ok('MarketItem updated successfuly', marketItemToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

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
        await MarketItem.findByIdAndDelete(req.params.id);
        // await MarketItem.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketItem deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};