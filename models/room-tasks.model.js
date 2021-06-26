// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Frequency Schema
let FrequencySchema = new Schema({

    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },

    frequency: {
        type: String,
        required: false,
        enum: [
            'Daily',
            'Weekly',
            'Monthly',
            'WeekInMonth',
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

    weekOfTheMonth: {
        type: String,
        required: false,
    },
});

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

    defaultFrequency: [
        FrequencySchema,
    ],

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