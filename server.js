require('dotenv').config();
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { expressjwt: expressJwt } = require('express-jwt');
const jwks = require('jwks-rsa');



// Middleware



app.get('/user/manifestMongoCustomer', jwtCheck, function (req, res) {

    const jwtCheck = expressJwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://lokalt-v2.eu.auth0.com/.well-known/jwks.json'
        }),
        audience: 'https://api.lokalt.no',
        issuer: 'https://lokalt-v2.eu.auth0.com/',
        algorithms: ['RS256']
    });

    console.log(req.user)
    console.log(jwtCheck)

    const request = require("request");

    const options = { method: 'POST',
    url: 'https://lokalt-v2.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"FUvSN6a0etaceslcQeCQpC4yHQvtPm68","client_secret":"pvpJLhrGnkGsdscClTPbCUAMeOea5l-3zbMTRd-TIcexG2N_KJKDcdDZHbmscaqB","audience":"https://lokalt-v2.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    });
    
    res.send('OK');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected........'.cyan))
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/brukere', require('./routes/brukerRoutes'));
app.use('/api/lokaler', require('./routes/lokaleRoutes'));
app.use('/api/meldinger', require('./routes/meldingRoutes'));

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`.yellow.bold);
})