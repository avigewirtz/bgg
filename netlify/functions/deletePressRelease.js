// netlify/functions/deletePressRelease.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async (event) => {
  try {
 
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);
    const { ticker } = data;

    if (!ticker) {
      return { statusCode: 400, body: 'Ticker is required' };
    }


    await prisma.pressRelease.delete({
      where: { ticker },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Press release deleted successfully' }),
    };
  } catch (error) {
    console.error('Failed to delete press release:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  } finally {
    await prisma.$disconnect();
  }
};
