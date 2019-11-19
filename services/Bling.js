const BlingOrder = require('../models/BlingOrder');

const blingOrder = new BlingOrder();

const insertOrders = async (deals) => {

    try {
        return new Promise((resolve, reject) => {
            try{
                resolve(deals.forEach(async deal => {
                    await blingOrder.save(deal);
                }));
                return;
            }
            catch(err) {
                reject(err);
                return;
            }
        });

    } catch(err) {
        console.log(err);
    }
};

/** Returns orders array
 * @returns {Array}
 */
const getOrders = async () => {
    try {
        const orders = await blingOrder.findAll();
        return orders.data.retorno.pedidos;
    } catch (err) {
        console.log(err);
    }
};

module.exports = { insertOrders, getOrders };