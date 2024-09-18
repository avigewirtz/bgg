const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async function(event) {
    if (event.httpMethod !== 'PUT') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const updatedData = JSON.parse(event.body);
    const ticker = updatedData.ticker;

    Object.keys(updatedData).forEach(key => {
        if (updatedData[key] === '') {
            updatedData[key] = null;
        }
    });

    try {
        const updatedPressRelease = await prisma.pressRelease.update({
            where: { ticker: ticker },
            data: updatedData
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPressRelease)
        };
    } catch (error) {
        console.error('Error updating press release:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating press release in the database' })
        };
    }
};
