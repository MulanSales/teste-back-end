const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: mongoose.Types.Decimal128,
        required: true
    },
    oportunidades: [{
        type: String,
        ref: 'Oportunidade'
    }]
}, {_id: false});

module.exports = mongoose.model('Acordo', acordoSchema);