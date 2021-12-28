const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const { checkAndSetUser } = require('./middlewares/authMiddlewares');
const { user } = require('../dbPasswordAndUsername');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(checkAndSetUser)
app.use(cors());
app.use(routes);

mongoose.connect(`mongodb+srv://${user.username}:${user.password}@cluster0.fmnru.mongodb.net/react-application?retryWrites=true&w=majority`)
    .then(() => {
        console.log('DB is connected!');
        app.listen(port, () => console.log(`Server is running on post ${port}`));
    })
    .catch(err => console.error('Filed to connect DB', err));
