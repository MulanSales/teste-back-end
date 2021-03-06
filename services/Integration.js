const AcordoSchema = require("../models/AcordoSchema");
const OportunidadeSchema = require("../models/OportunidadeSchema");

const { insertOrders, getOrders } = require('./Bling');
const { getDeals } = require('./PipeDrive');

exports.integrate = () => {
    return setInterval( async () => {
        try{
            console.log("----Integration Routine Started----");
            const deals = await getDeals();
            const orders = await insertOrders(deals).then(() => getOrders());

            for (const [idx, order] of orders.entries()){
                const pedido = order.pedido;
                const valor = parseFloat(pedido.totalvenda).toFixed(2);
                const data = pedido.data;
                const consolidacaoId = Buffer.from(`${valor}${data}`, 'utf-8').toString('hex');

                let consolidacao = await AcordoSchema.findById(consolidacaoId);

                if (!consolidacao){
                    consolidacao = new AcordoSchema({
                        _id: consolidacaoId,
                        valor: valor,
                        data: data
                    });
                };

                let oportunidadeDoc = await OportunidadeSchema.findById(pedido.numero);

                if (!oportunidadeDoc) {
                    const oportunidade = new OportunidadeSchema({
                        _id: pedido.numero,
                        data: data,
                        valor: valor,
                        clienteId: pedido.cliente.id,
                    });
                    
                    oportunidadeDoc = await oportunidade.save();
                    consolidacao.oportunidades.push(oportunidadeDoc._id);
                    await consolidacao.save();
                };
            };
        } catch(err) {
            console.log(err);
        }
    }, 1800000);
};



