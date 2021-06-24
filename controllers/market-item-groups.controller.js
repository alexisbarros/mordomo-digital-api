// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const httpResponse = require('../utils/http-response');

// Model
const MarketItemGroup = require('../models/market-item-groups.model');

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
 * Register marketItemGroup in db.
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

        // Create marketItemGroup in database
        let marketItemGroup = await MarketItemGroup.create({
            name: req.body.name,
            icon: image,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketItemGroup data to return
        let marketItemGroupToFront = {
            _id: marketItemGroup._id,
            _createdAt: marketItemGroup._createdAt,
            name: marketItemGroup.name,
            icon: marketItemGroup.icon,
        };

        res.send(httpResponse.ok('MarketItemGroup created successfuly', marketItemGroupToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one marketItemGroup by id.
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

        // Get marketItemGroup by id
        let marketItemGroup = await MarketItemGroup.findById(req.params.id);

        // Check if marketItemGroup was removed
        if (marketItemGroup._deletedAt) throw new Error('MarketItemGroup removed');

        // Create marketItemGroup data to return
        let marketItemGroupToFront = {
            _id: marketItemGroup._id,
            _createdAt: marketItemGroup._createdAt,
            name: marketItemGroup.name,
            icon: marketItemGroup.icon,
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketItemGroup returned successfully', marketItemGroupToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all marketItemGroups.
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

        // Get all marketItemGroups
        let marketItemGroups = await MarketItemGroup.find({
            _deletedAt: null
        });

        // Create marketItemGroup data to return
        const marketItemGroupsToFront = marketItemGroups.map(marketItemGroup => {
            return {
                _id: marketItemGroup._id,
                _createdAt: marketItemGroup._createdAt,
                name: marketItemGroup.name,
                icon: marketItemGroup.icon,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketItemGroups returned successfully', marketItemGroupsToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a marketItemGroup.
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
        };
        if (image) {
            formUpdated['icon'] = image;
        }

        // Update marketItemGroup data
        let marketItemGroup = await MarketItemGroup.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create marketItemGroup data to return
        let marketItemGroupToFront = {
            _id: marketItemGroup._id,
            _createdAt: marketItemGroup._createdAt,
            name: marketItemGroup.name,
            icon: marketItemGroup.icon,
        };

        res.send(httpResponse.ok('MarketItemGroup updated successfuly', marketItemGroupToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a marketItemGroup.
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

        // Delete marketItemGroup by id
        await MarketItemGroup.findByIdAndDelete(req.params.id);
        // await MarketItemGroup.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MarketItemGroup deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};