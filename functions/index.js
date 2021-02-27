const functions = require("firebase-functions");

//set up needed for backend express running on cloud functions
const express = require("express");

const cors = require("cors");

const stripe = require("stripe")('sk_test_51IORW9LozV0yTN5Mh9vAxi8RkB9nCropat6Y8qGFphJrMoP2DeGkVoAVe94eoBbd1HNIXF3tl3k1FpIp8QyOkS8g00snxMR0OE')

//API

// -App config

const app = express();

// -Middlewares
app.use(cors({ origin : true }));
app.use(express.json());
// -API routes
app.get('/', (request,response) => response.status(200).send('hello world'))

app.post('/payments/create', async(request,response) => {
    const total = request.query.total;
    console.log('Payement request received', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency : "usd"
    });
    //OK - created and we are sending back the response (the paymentIntent)
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
})
// -Listen command

exports.api = functions.https.onRequest(app)

//example end point (if we click the link we will find an api running on cloud functions with hello world)
//http://localhost:5001/fir-e3fd9/us-central1/api