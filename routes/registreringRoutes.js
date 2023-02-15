const express = require('express')
const router = express.Router()
const { expressjwt: expressJwt } = require('express-jwt');
const jwks = require('jwks-rsa');

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

router.get('/user/manifestMongoCustomer', jwtCheck, function (req, res) {



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

module.exports = router