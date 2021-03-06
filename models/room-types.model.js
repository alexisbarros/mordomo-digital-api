// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema
let RoomTypeSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    icon: {
        data: Buffer,
        contentType: String,
    },

    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RoomTask'
        }
    ],

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

module.exports = mongoose.model('RoomType', RoomTypeSchema);