const express = require('express');
const app = express();
const port = 3000;

// serve static files from the 'public' directory
app.use(express.static('public'));

// define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// define a route for the about page
app.get('/about', (req, res) => {
    res.send('About Us');
});

app.use(express.json()); // middleware to parse JSON bodies

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // log the HTTP method and URL of each request
    next(); // pass control to the next middleware function
});

app.use((err, req, res, next) => {
    console.error(err.stack); // log any errors that occur
    res.status(500).send('Something broke!'); // send a 500 error response
});

// start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/submit', (req, res) => {
    const data = req.body; // get the JSON data from the request body
    res.send(`Received: ${JSON.stringify(data)}`); // send a response back to the client
});