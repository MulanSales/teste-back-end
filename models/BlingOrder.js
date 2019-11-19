const axios = require('axios').default;
const js2xmlparser = require("js2xmlparser");
const moment = require('moment');
moment.locale('pt-br');

const parseDealToOrderXml = (deal) => {
    const obj = {
        "data": moment(deal.close_time.split(" ")[0]).format('L'),
        "cliente": {
            "nome": deal.org_name
        },
        "itens": [
            {
                "item": {
                    "codigo": deal.id,
                    "descricao": `deal ${deal.id}`,
                    "qtde": 1,
                    "vlr_unit": deal.value
                }
            }
        ]
    };

    return js2xmlparser.parse("pedido", obj);
};

const BlingOrder = class {

    constructor() {
        this.url = `${process.env.BLING_ADDRESS}`; 
        this.axios = axios.create({baseURL: this.url});
    }

    async save(obj) {
        return await this.axios({
            url: '/pedido/json/',
            method: 'POST',
            params: {
                apikey: process.env.BLING_API_KEY,
                xml: parseDealToOrderXml(obj)
            }
        });
    }

    async findAll() {
        return await this.axios({
            url: '/pedidos/json/',
            method: 'GET',
            params: {
                apikey: process.env.BLING_API_KEY
            }
        });
    }
};

module.exports = BlingOrder;