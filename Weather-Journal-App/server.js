// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
    console.log("server running")
    console.log(`running on localhost: {$port}`);
};

// GET route
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData)
};

const data = [];

app.get('/all', getData);

function getData(req, res) {
    res.send(data)
    console.log(data)
};

// POST route
app.post('/add', addData);

function addData(req, res) {
    console.log(req.body);

    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        feelings: req.body.feelings
    }

    data.push(newData);
    res.send(data);
    console.log(data);
};