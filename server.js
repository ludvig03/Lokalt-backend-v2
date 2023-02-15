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
app.use('/api/registreringer', require('./routes/registreringRoutes'));

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`.yellow.bold);
})