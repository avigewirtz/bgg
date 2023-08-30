
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5001;


const cors = require('cors');
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { password } = req.body;

    // This is just an example. In a real-world application,
    // you'd want to securely hash and store passwords and
    // then verify against the hashed version.
    const correctPassword = 'bgandg770!'; // Replace with your password

    if (password === correctPassword) {
        // Issue token
        const token = jwt.sign({ authenticated: true }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Authentication failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});







////const express = require('express');
////const bcrypt = require('bcryptjs');
////const session = require('express-session');
////
////const app = express();
////
////app.use(express.json());
////app.use(express.urlencoded({ extended: true }));
////app.use(session({
////    secret: 'aweknqkjwefkqwbe;fnwe;kjfbwkejbfwe',
////    resave: false,
////    saveUninitialized: false
////}));
////
////// Replace with your actual bcrypt hash. You can create this using a bcrypt hash generator tool.
////const PASSWORD_HASH = '$2a$10$RG16l3YpQdbGgQGISOUfAOJTQNPjsCJ5gwjSImpHKrC693Ouuej7a';
////
////app.get('/', (req, res) => {
////    if (req.session.isAuthenticated) {
////        res.send('Welcome to the protected site!');
////    } else {
////        res.send(`
////            <form action="/login" method="post">
////                <label>Password: <input type="password" name="password" required></label>
////                <button type="submit">Login</button>
////            </form>
////        `);
////    }
////});
////
////app.post('/login', async (req, res) => {
////    if (await bcrypt.compare(req.body.password, PASSWORD_HASH)) {
////        req.session.isAuthenticated = true;
////        res.redirect('/');
////    } else {
////        res.send('Incorrect password');
////    }
////});
////
////app.listen(5001, () => {
////    console.log('Server is running on port 5001');
////});
//
//
//const express = require('express');
//const bcrypt = require('bcryptjs');
//const session = require('express-session');
//const cors = require('cors');
//
//const app = express();
//
//app.use(cors());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(session({
//    secret: 'aweknqkjwefkqwbe;fnwe;kjfbwkejbfwe',
//    resave: false,
//    saveUninitialized: false
//}));
//
//const PASSWORD_HASH = '$2a$10$RG16l3YpQdbGgQGISOUfAOJTQNPjsCJ5gwjSImpHKrC693Ouuej7a';
//
//app.get('/status', (req, res) => {
//    if (req.session.isAuthenticated) {
//        res.json({ isAuthenticated: true });
//    } else {
//        res.json({ isAuthenticated: false });
//    }
//});
//
//app.post('/login', async (req, res) => {
//    if (await bcrypt.compare(req.body.password, PASSWORD_HASH)) {
//        req.session.isAuthenticated = true;
//        res.json({ success: true, message: 'Logged in successfully' });
//    } else {
//        res.json({ success: false, message: 'Incorrect password' });
//    }
//});
//
//app.listen(5001, () => {
//    console.log('Server is running on port 5001');
//});
