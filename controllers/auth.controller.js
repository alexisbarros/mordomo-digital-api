// Modules
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        let users = await user_controller.readAll(req, res);
        if(
            users.data && 
            users.data.filter(user => user.email === req.body.email).length
        ) throw { message: 'O e-mail informado já foi cadastrado' }

        // Create a user in db
        let user = await user_controller.create(req, res);
        if(user.code === 400) throw { message: user.message }

        // Generate token
        let token = jwt.sign({ id: user.data._id, email: user.data.email }, process.env.JWT_SECRET);
        
        // Create user to send to front
        let usersToFront = {
            _id: user.data._id,
            email: user.data.email,
            isAdmin: user.data.isAdmin,
            token: token
        };

        console.info('Usuário cadastrado com sucesso');
        res.send({
            data: usersToFront,
            message: 'Usuário cadastrado com sucesso',
            code: 200
        });

    } catch(err){

        console.error(err.message);
        res.send({
            data: {},
            message: err.message,
            code: 400
        });

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
        if(!user) throw { message: 'Usuário não encontrado' };
             
        // Check pass
        let isChecked = await bcrypt.compare(req.body.password, user.password);
        if(isChecked){

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
            
            console.info('Usuário logado com sucesso');
            res.send({
                data: userToFront,
                message: 'Usuário logado com sucesso.',
                code: 200
            })

        } else {

            throw { message: 'Senha incorreta' }

        }

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
        if(!user) throw { message: 'Usuário não encontrado' };
        if(!user.isAdmin) throw { message: 'Usuário não é administrador' };
             
        // Check pass
        let isChecked = await bcrypt.compare(req.body.password, user.password);
        if(isChecked){

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
            
            console.info('Usuário logado com sucesso');
            res.send({
                data: userToFront,
                message: 'Usuário logado com sucesso.',
                code: 200
            })

        } else {

            throw { message: 'Senha incorreta' }

        }

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