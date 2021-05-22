// Modules
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const httpResponse = require('../utils/http-response');

// Controllers
const user_controller = require('./users.controller');

// Models
const User = require('../models/users.model');

/**
 * Register a user in db.
 * @param {*} req 
 * @param {*} res 
 */
exports.register = async (req, res) => {

    // Create a user in db
    await user_controller.create(req, res);

}

/**
 * Login user.
 * @param {*} req 
 * @param {*} res 
 */
exports.login = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Search user
        let user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error('Usuário não encontrado');

        // Check pass
        let isChecked = await bcrypt.compare(req.body.password, user.password);
        if (isChecked) {

            // Generate token
            let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

            // Create user data to return
            let userToFront = {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            };

            // Disconnect to database
            await mongoose.disconnect();

            res.send(httpResponse.ok('Usuário logado com sucesso', userToFront));

        } else {

            throw new Error('Senha incorreta');

        }

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}

/**
 * Login admin user.
 * @param {*} req 
 * @param {*} res 
 */
exports.loginAdmin = async (req, res) => {

    try {

        // Connect to database
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Search user and check if user is admin
        let user = await User.findOne({ email: req.body.email });
        if (!user) throw new Error('Usuário não encontrado');
        if (!user.isAdmin) throw new Error('Usuário não é administrador');

        // Check pass
        let isChecked = await bcrypt.compare(req.body.password, user.password);
        if (isChecked) {

            // Generate token
            let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

            // Create user data to return
            let userToFront = {
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token
            };

            // Disconnect to database
            await mongoose.disconnect();

            res.send(httpResponse.ok('Usuário logado com sucesso', userToFront));

        } else {

            throw new Error('Senha incorreta');

        }

    } catch (err) {

        // Disconnect to database
        await mongoose.disconnect();

        res.send(httpResponse.error(err.message, {}));

    }

}