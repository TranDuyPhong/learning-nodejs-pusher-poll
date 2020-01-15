const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB config
require('./config/db');

const poll = require('./routes/poll');

const app = express();

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cors
app.use(cors());

app.use('/poll', poll);

const PORT = 3000;

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
