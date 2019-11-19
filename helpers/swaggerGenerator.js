const path = require('path');

const swaggerFileGenerator = (app, host) => {
    const expressSwagger = require('express-swagger-generator')(app);

    let swaggerOptions = {
        swaggerDefinition: {
            info: {
                description: 'teste back end',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: `${host}`,
            basePath: '/api/v1',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['https', 'http']
        },
        basedir: path.join(__dirname, '../'),
        files: ['./controllers/*.js', './models/*.js', './app.js']
    };

    expressSwagger(swaggerOptions);
}

module.exports = { swaggerFileGenerator }