// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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