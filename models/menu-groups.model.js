// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
let MenuGroupSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuOption'
        }
    ],

    meals: [
        {
            type: String,
            required: false,
            enum: [
                'a_breakfast',
                'b_morningsnack',
                'c_lunch',
                'd_afternoonsnack',
                'e_dinner',
                'f_eveningsnack',
            ],
        }
    ],

    icon: {
        data: Buffer,
        contentType: String,
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

module.exports = mongoose.model('MenuGroup', MenuGroupSchema);