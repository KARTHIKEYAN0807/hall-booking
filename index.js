// index.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // To parse JSON bodies
app.use(routes); // To use the routes defined in routes.js

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
