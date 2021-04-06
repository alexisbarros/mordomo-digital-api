// Modules
const mongoose = require('mongoose');
const httpResponse = require('../utils/http-response');

// Model
const Menu = require('../models/menu.model');

/**
 * Register menu in db.
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

        // Create menu in database
        let menu = await Menu.create({
            name: req.body.name,
            day: req.body.day,
            meals: req.body.meals,
            user: req.body.user,
        });

        // Disconnect to database
        await mongoose.disconnect();

        // Create menu data to return
        let menuToFront = {
            _id: menu._id,
            _createdAt: menu._createdAt,
            name: menu.name,
            day: menu.day,
            meals: menu.meals,
            user: menu.user,
        };

        res.send(httpResponse.ok('Menu created successfuly', menuToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Get one menu by id.
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

        // Get menu by id
        let menu = await Menu.findById(req.params.id)
            .populate({
                path: 'meals',
                populate: {
                    path: 'menuOptions',
                }
            }).exec();

        // Check if menu was removed
        if (menu._deletedAt) throw new Error('Menu removed');

        // Remove db deleted menuOptions
        let meals = menu.meals.map(meal => {
            return {
                ...meal,
                menuOptions: meal.menuOptions.filter(menuOption => !menuOption._deletedAt)
            }
        });

        // Create menu data to return
        let menuToFront = {
            _id: menu._id,
            _createdAt: menu._createdAt,
            name: menu.name,
            day: menu.day,
            meals: meals,
            user: menu.user
        };

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Menu returned successfully', menuToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Get all menus from a user.
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

        // Get all menus
        let menus = await Menu.find({
            user: req.params.id,
            _deletedAt: null,
        })
            .populate({
                path: 'meals',
                populate: {
                    path: 'menuOptions',
                }
            }).exec();

        // Create menu data to return
        const menusToFront = menus.map(menu => {

            // Remove db deleted menuOptions
            let meals = menu.meals.map(meal => {
                return {
                    ...meal,
                    menuOptions: meal.menuOptions.filter(menuOption => !menuOption._deletedAt)
                }
            });

            return {
                _id: menu._id,
                _createdAt: menu._createdAt,
                name: menu.name,
                day: menu.day,
                meals: meals,
                user: menu.user,
            };
        });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Menus returned successfully', menusToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Update a menu.
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

        // Update menu data
        let menu = await Menu.findByIdAndUpdate(req.params.id, formUpdated);

        // Disconnect to database
        await mongoose.disconnect();

        // Create menu data to return
        let menuToFront = {
            _id: menu._id,
            _createdAt: menu._createdAt,
            name: menu.name,
            day: menu.day,
            meals: meals,
            user: menu.user
        };

        res.send(httpResponse.ok('Menu updated successfuly', menuToFront));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};

/**
 * Delete a menu.
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

        // Delete menu by id
        await Menu.findByIdAndUpdate(req.params.id, { _deletedAt: Date.now() });

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.ok('Menu deleted successfuly', {}));

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

};