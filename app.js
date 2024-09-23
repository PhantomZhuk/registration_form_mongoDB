const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/users', (req, res) => {
    res.sendFile(__dirname + '/public/users/index.html');
});


app.get(`/allusers`, async (req, res) => {
    const users = await User.find();
    res.send(users);
})


app.post(`/register`, (req, res) => {
    const { login, password } = req.body;
    console.log(login, password);
    if (login && password) {

        try {
            const user = new User({
                login,
                password
            })
            user.save();
            res.sendStatus(201);
        } catch (error) {
            console.log(500);
        }
    } else {
        res.sendStatus(400);
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})