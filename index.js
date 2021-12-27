const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Awesome Calculator');
});


app.listen(port, () => {
    console.log('Server is running on port', port);
})