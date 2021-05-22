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

    try {

        // Check if email alredy exists
        const users = await user_controller.readOneByEmail(req, res);
        if (users.data._id) throw new Error('O e-mail informado já foi cadastrado');

        // Create a user in db
        const user = await user_controller.create(req, res);
        if (user.code === 400) throw new Error(user.message);

        // Generate token
        let token = jwt.sign({ id: user.data._id, email: user.data.email }, process.env.JWT_SECRET);

        // Create user to send to front
        let userToFront = await {
            _id: user.data._id,
            email: user.data.email,
            isAdmin: user.data.isAdmin,
            token: token
        };

        res.send(httpResponse.ok('Usuário cadastrado com sucesso', userToFront));

    } catch (err) {

        res.send(httpResponse.error(err.message, {}));

    }

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