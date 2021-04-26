// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Meals
let Meals = new Schema({

    meal: {
        type: String,
        required: false,
        enum: [
            'a_breakfast',
            'b_snack',
            'c_lunch',
            'd_dinner',
        ],
    },

    day: {
        type: String,
        required: false,
        enum: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ],
    },

    menuOptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuOption'
        }
    ],

});

// Schema
let MenuSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    meals: [
        Meals
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    _createdAt: {
        type: Date,
        required: true,
        default: () => {
            if (!this._createdAt) {
                return Date.now();
            }
        },
    },

    _updatedAt: {
        type: Date,
        required: true,
        default: () => {
            if (!this._updatedAt) {
                return Date.now();
            }
        },
    },

    _deletedAt: {
        type: Date,
        required: false,
        default: null
    },

});

module.exports = mongoose.model('Menu', MenuSchema);