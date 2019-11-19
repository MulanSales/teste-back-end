const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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