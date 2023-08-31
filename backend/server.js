const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Using Heroku's dynamic port or 5001 locally
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { password } = req.body;
    const correctPassword = 'bgandg770!'; // Replace with your password

    if (password === correctPassword) {
        const token = jwt.sign({ authenticated: true }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Authentication failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
