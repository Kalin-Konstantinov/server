const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const { isAuth } = require('./middlewares/authMiddlewares');

const app = express();

const port = 5000;

app.use(express.json());
app.use(isAuth)
app.use(cors());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/react-project')
    .then(() => {
        console.log('DB is connected!');
        app.listen(port, () => console.log(`Server is running on port 5000`));
    })
    .catch(err => console.error('Filed to connect DB', err));
