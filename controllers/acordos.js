const Acordo = require('../models/AcordoSchema');

exports.getAcordos = async (req, res, next) => {
    try {
        const acordos = await Acordo.find().populate('oportunidades');

        if (!acordos || acordos.length === 0) {
            return res.status(404).json({
                message: 'Não foi possível encontrar nenhum acordo'
            });
        }

        return res.status(200).json({
            message: 'Fetch de acordos realizado com sucesso',
            acordos: acordos,
            totalItems: acordos.length
        });
    } catch (err) {
        console.log(err);
    }
};