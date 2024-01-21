const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async function(event) {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        let pressReleases = await prisma.pressRelease.findMany({
            // Fetch all fields
        });

        // Filter out null fields from each press release
        pressReleases = pressReleases.map(pressRelease => {
            const filteredPressRelease = {};
            for (const key in pressRelease) {
                if (pressRelease[key] !== null) {
                    filteredPressRelease[key] = pressRelease[key];
                }
            }
            return filteredPressRelease;
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pressReleases)
        };
    } catch (error) {
        console.error('Error fetching press releases:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching data from the database' })
        };
    }
};
