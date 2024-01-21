const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async function(event) {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const ticker = event.queryStringParameters.ticker;

    if (!ticker) {
        return { statusCode: 400, body: 'Ticker parameter is required' };
    }

    try {
        const pressRelease = await prisma.pressRelease.findUnique({
            where: { ticker: ticker }
        });

        if (!pressRelease) {
            return { statusCode: 404, body: JSON.stringify({ message: 'Page not found' }) };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: 'Page exists', wordpressPageId: pressRelease.wordpressPageId })
        };
    } catch (error) {
        console.error('Error checking for page:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error checking for page in the database' })
        };
    }
};
