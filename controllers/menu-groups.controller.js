// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const httpResponse = require('../utils/http-response');

// Model
const MenuGroup = require('../models/menu-groups.model');

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
 * Register menuGroup in db.
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

        // Create menuGroup in database
        let menuGroup = await MenuGroup.create({
            name: req.body.name,
            options: req.body.options,
            meals: req.body.meals,
            icon: image,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create menuGroup data to return
        let menuGroupToFront = {
            _id: menuGroup._id,
            _createdAt: menuGroup._createdAt,
            name: menuGroup.name,
            options: menuGroup.options,
            meals: menuGroup.meals,
            icon: menuGroup.icon,
        };

        res.send(httpResponse.ok('MenuGroup created successfuly', menuGroupToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one menuGroup by id.
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

        // Get menuGroup by id
        let menuGroup = await MenuGroup.findById(req.params.id)
            .populate('options')
            .exec();

        // Check if menuGroup was removed
        if (menuGroup._deletedAt) throw new Error('MenuGroup removed');

        // Create menuGroup data to return
        let menuGroupToFront = {
            _id: menuGroup._id,
            _createdAt: menuGroup._createdAt,
            name: menuGroup.name,
            options: menuGroup.options,
            meals: menuGroup.meals,
            icon: menuGroup.icon,
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MenuGroup returned successfully', menuGroupToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all menuGroups.
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

        // Get all menuGroups
        let menuGroups = await MenuGroup.find({
            _deletedAt: null,
        })
            .populate('options')
            .exec();

        // Create menuGroup data to return
        const menuGroupsToFront = menuGroups.map(menuGroup => {
            return {
                _id: menuGroup._id,
                _createdAt: menuGroup._createdAt,
                name: menuGroup.name,
                options: menuGroup.options,
                meals: menuGroup.meals,
                icon: menuGroup.icon,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MenuGroups returned successfully', menuGroupsToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a menuGroup.
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

        // Create menuOption in database
        let formUpdated = {
            ...req.body,
            options: req.body.options,
            meals: req.body.meals,
        };
        if (image) {
            formUpdated['icon'] = image;
        }

        // Update menuGroup data
        let menuGroup = await MenuGroup.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create menuGroup data to return
        let menuGroupToFront = {
            _id: menuGroup._id,
            _createdAt: menuGroup._createdAt,
            name: menuGroup.name,
            options: menuGroup.options,
            meals: menuGroup.meals,
            icon: menuGroup.icon,
        };

        res.send(httpResponse.ok('MenuGroup updated successfuly', menuGroupToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a menuGroup.
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

        // Delete menuGroup by id
        await MenuGroup.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('MenuGroup deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};