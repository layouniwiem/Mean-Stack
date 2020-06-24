const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;

const path = require('path');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/api/users');
const admins = require('./routes/api/admins');
const posts = require('./routes/api/posts');


require('./config/passport')(passport);
// Initialize the app
const app = express();

// Middlewares
// Form Data Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy


// Bring in the Database Config and connect with the database
mongoose.connect("mongodb+srv://wiem:0000@cluster0-ufuvx.mongodb.net/test", {
    useNewUrlParser: true
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});

// app.get('/', (req, res) => {
//     return res.send("<h1>Hello World</h1>");
// });
// Bring in the Users route
app.use('/api/users', users);
// Bring in the admins route

app.use('/api/admins', admins);
app.use('/api/posts', posts);



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})