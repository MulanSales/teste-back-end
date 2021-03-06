const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Acordo 
 * @property {string} _id
 * @property {string} data
 * @property {number} valor
 * @property {Array.<Oportunidade>} oportunidades
 */

const acordoSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    oportunidades: [{
        type: String,
        ref: 'Oportunidade'
    }]
}, {_id: false});

module.exports = mongoose.model('Acordo', acordoSchema);