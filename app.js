// Exteral Packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Local Services
const pipeBlingIntegrationService = require('./services/Integration');

// Controller Routers
const acordosRoutes = require('./routes/acordos');

// Express App Initialization
const app =  express();

// Port variable
const PORT = process.env.PORT || 3000;

// MongoDB Credentials
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodecourse-tnt0c.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

// Parser incoming request to json 
app.use(bodyParser.json());

// Handle CORS requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});

// Controller Routers
app.use('/api/v1', acordosRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;

    const data = error.data ? error.data : null;

    res.status(statusCode).json({
        message: message,
        data: data
    });
});

// Integration routine between Bling and PipeDrive, it happens in a 30 minutes interval
pipeBlingIntegrationService.integrate();

// Moongose connection and server initialization
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(MONGODB_URI);
        console.log(err);
    });
