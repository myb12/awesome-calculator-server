const express = require('express');
const upload = require('./utilities/multer');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//======Database configuration======//
const uri = "mongodb+srv://mydbuser2:EcHwYBhHvZWMhNgY@cluster0.ig1ef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
    try {
        await client.connect();
        const database = client.db("calculatorDB");
        const calculationCollection = database.collection("calculations");;
        console.log('DB is connected');

        //======POST API for Add Calculations======//
        app.post('/addCalculation', upload.single('file'), async (req, res) => {
            try {
                const data = { ...req.body, location: req.file.path, fileName: req.file.filename };
                const result = await calculationCollection.insertOne(data);
                res.json(result);
            } catch (err) {
                res.json(400);
            }
        });

        //======GET API for Add Calculations======//
        app.get('/results', async (req, res) => {
            const cursor = await calculationCollection.find({});
            const items = await cursor.toArray();
            res.send(items);
        })

    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello Awesome Calculator');
});

app.listen(port, () => {
    console.log('Server is running on port', port);
})