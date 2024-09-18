const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.handler = async function(event) {

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);

    
        const existingPressRelease = await prisma.pressRelease.findUnique({
            where: {
                ticker: data.ticker
            }
        });

        if (existingPressRelease) {
      
            return {
                statusCode: 409, 
                body: JSON.stringify({ message: 'A press release with this ticker already exists' }),
            };
        }


        const pressRelease = await prisma.pressRelease.create({ 
            data: {
                ticker: data.ticker,
                fullName: data.fullName,
                shortName: data.shortName,
                otherTicker: data.otherTicker,
                otherFullName: data.otherFullName,
                otherExchange: data.otherExchange,
                otherShortName: data.otherShortName,
                caseType: data.caseType,
                leadPlaintiffDeadline: data.leadPlaintiffDeadline ? new Date(data.leadPlaintiffDeadline) : null,
                classPeriodStartDate: data.classPeriodStartDate ? new Date(data.classPeriodStartDate) : null,
                classPeriodEndDate: data.classPeriodEndDate ? new Date(data.classPeriodEndDate) : null,
                caseDetails: data.caseDetails,
                ipoDate: data.ipoDate ? new Date(data.ipoDate) : null,
                investigationParagraph: data.investigationParagraph,
                purchaseDate: data.purchaseDate ? new Date(data.purchaseDate) : null,
                spacFullName: data.spacFullName,
                spacShortName: data.spacShortName,
                mergerDate: data.mergerDate ? new Date(data.mergerDate) : null,
                exchange: data.exchange,
                content: data.content,
                contentWord: data.contentWord,
                wordpressPageId: data.wordpressPageId,
           
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(pressRelease),
        };
    } catch (error) {
        console.error('Error in saving press release:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error saving press release', error: error.message }),
        };
    }
};
