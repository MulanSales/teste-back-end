const Pipedrive = require('pipedrive');

const pipedriveClient = new Pipedrive.Client(process.env.PIPEDRIVE_API_KEY, {strictMode: true});

const getDeals = () => {
    return new Promise((resolve, reject) => {
        return pipedriveClient.Deals.getAll({status: 'won'}, function(err, deals) {
            if (err) { 
                reject(err);
                return;
            };
            resolve(deals);
            return;
        });
    });
};

module.exports = { getDeals };
