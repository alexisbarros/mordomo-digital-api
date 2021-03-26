// Modules
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Market Item Schema to put in market cart
let MarketItemSchemaWithQtd = new Schema({

    marketItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MarketItem',
        required: true
    },

    qtd: {
        type: Number,
        required: true,
        default: 0
    },

});

// Schema
let MarketCartSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    itens: [
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

module.exports = mongoose.model('MarketCart', MarketCartSchema);