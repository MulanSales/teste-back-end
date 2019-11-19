const Acordo = require('../models/AcordoSchema');

/**
 * Captura todos os acordos gerados da integração do PipeDrive com o Bling
 * @route GET /acordos
 * @group Acordos
 * @returns {Array.<Acordo>} 200 - Uma array de acordos e oportunidades associadas 
 * @returns {object} 404 - a array de acordos não foi encontrada
 * @returns {object} 500 - erro interno do servidor
 */
exports.getAcordos = async (req, res, next) => {
    try {
        const acordos = await Acordo.find().populate('oportunidades');

        if (!acordos || acordos.length === 0) {
            const error = new Error('Não foi possível encontrar nenhum acordo');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            message: 'Fetch de acordos realizado com sucesso',
            acordos: acordos,
            totalItems: acordos.length
        });
    } catch (err) {
        next(err);
    }
};