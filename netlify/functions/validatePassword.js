exports.handler = async function(event, context) {
    const inputPassword = JSON.parse(event.body).password;
    const correctPassword = process.env.SITE_PASSWORD;

    if (inputPassword === correctPassword) {
        return {
            statusCode: 200,
            body: JSON.stringify({ validated: true })
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ validated: false, error: "Incorrect password" })
        };
    }
};

