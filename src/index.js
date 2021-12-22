const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');


const port = 5000;

app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/react-project')
    .then(() => {
        console.log('DB is connected!');
        app.listen(port, () => console.log(`Server is running on port 5000`));
    })
    .catch(err => console.error('Filed to connect DB', err));
