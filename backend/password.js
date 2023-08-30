const bcrypt = require('bcryptjs');

const password = "bgandg770!"; // Replace with your actual password
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
    } else {
        console.log("Bcrypt hash:", hash);
    }
});
