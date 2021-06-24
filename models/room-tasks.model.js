// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
let RoomTaskSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    icon: {
        data: Buffer,
        contentType: String,
    },

    frequency: {
        type: String,
        required: false,
        enum: [
            'Daily',
            'Weekly',
            'Monthly',
            'Yearly'
        ],
        default: 'Daily'
    },

    weekdays: [
        {
            type: String,
            required: false,
        }
    ],

    day: {
        type: String,
        required: false,
    },

    date: {
        type: String,
        required: false,
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

module.exports = mongoose.model('RoomTask', RoomTaskSchema);