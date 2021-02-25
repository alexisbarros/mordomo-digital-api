// Modules
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');

// Model
const MenuGroup = require('../models/menu-groups.model');

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

        // Create menuGroup in database
        let menuGroup = await MenuGroup.create({
            name: req.body.name,
            options: req.body.options,
        });
    
        // Disconnect to database
        await mongoose.disconnect();

        // Create menuGroup data to return
        let menuGroupToFront = {
            _id: menuGroup._id,
            _createdAt: menuGroup._createdAt,
            name: menuGroup.name,
            options: menuGroup.options,
        };
        
        console.info('MenuGroup created successfuly');
        res.send({
            data: menuGroupToFront,
            message: 'MenuGroup created successfuly',
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
        .populate('options');
        
        // Check if menuGroup was removed
        if(menuGroup._deletedAt) throw { message: 'MenuGroup removed' };

        // Create menuGroup data to return
        let menuGroupToFront = {
            _id: menuGroup._id,
            _createdAt: menuGroup._createdAt,
            name: menuGroup.name,
            options: menuGroup.options,
        };
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('MenuGroup returned successfully');
        res.send({
            data: menuGroupToFront,
            message: 'MenuGroup returned successfully',
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
        let menuGroups = await MenuGroup.find({})
        .populate('options');

        // Filter menuGroup tha wasnt removed
        let menuGroupsToFront = menuGroups.filter(menuGroup => !menuGroup._deletedAt);

        // Create menuGroup data to return
        menuGroupsToFront = menuGroupsToFront.map(menuGroup => {
            return {
                _id: menuGroup._id,
                _createdAt: menuGroup._createdAt,
                name: menuGroup.name,
                options: menuGroup.options,
            };
        });
        
        // Disconnect to database
        await mongoose.disconnect();
        
        console.info('MenuGroups returned successfully');
        res.send({
            data: menuGroupsToFront,
            message: 'MenuGroups returned successfully',
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

        // Create menuOption in database
        let formUpdated = { 
            ...req.body,
            options: req.body.options,
        };
    
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
        };
        
        console.info('MenuGroup updated successfuly');
        res.send({
            data: menuGroupToFront,
            message: 'MenuGroup updated successfuly',
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
    
        console.info('MenuGroup deleted successfuly');
        res.send({
            data: {},
            message: 'MenuGroup deleted successfuly',
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