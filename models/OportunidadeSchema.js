const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef Oportunidade 
 * @property {string} _id
 * @property {string} data
 * @property {number} valor
 * @property {number} clientId
 */

const oportunidadeSchema = new Schema({
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
    clienteId: {
        type: Number,
        required: true
    }
}, {_id: false});

module.exports = mongoose.model('Oportunidade', oportunidadeSchema);