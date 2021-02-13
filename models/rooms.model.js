// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Task Schema to put in room
let TaskSchemaWithFrequency = new Schema({
    
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomTask',
        required: true
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

    initialDate: {
        type: Date,
        required: false,
        default: Date.now()
    }

});

// Market Item Schema to put in room
let MarketItemSchemaWithQtd = new Schema({
    
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomMarketItem',
        required: true
    },

    qtd: {
        type: Number,
        required: false
    },

    obs: {
        type: String,
        required: false
    },
    
    checked: {
        type: Boolean,
        required: true,
        default: false
    }

});

// Schema
let RoomSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },

    tasks: [
        TaskSchemaWithFrequency
    ],
    
    marketList: [
        MarketItemSchemaWithQtd
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
            if(!this._createdAt) {            
                return Date.now();
            }
        },
    },

    _updatedAt: { 
        type: Date,
        required: true,
        default: () => {
            if(!this._updatedAt) {            
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

module.exports = mongoose.model('Room', RoomSchema);