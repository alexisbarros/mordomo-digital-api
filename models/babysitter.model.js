// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
let BabysitterSchema = new Schema({

    fullDate: {
        type: String,
        required: true,
    },

    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BabysitterTask'
        }
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

module.exports = mongoose.model('Babysitter', BabysitterSchema);