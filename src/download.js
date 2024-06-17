// import { saveAs } from 'file-saver';
// import * as htmlDocx from 'html-docx-js/dist/html-docx';

// export const downloadAsWord = (htmlContent, fileName) => {

//     // Ensure UTF-8 encoding is set in the HTML content
//     if (!htmlContent.includes('<meta charset="UTF-8">')) {
//         htmlContent = `<html><head><meta charset="UTF-8"></head><body>${htmlContent}</body></html>`;
//     }

//     // Convert HTML to a DOCX blob
//     const blob = htmlDocx.asBlob(htmlContent, {
//         type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     });

//     // Use FileSaver to save the file
//     saveAs(blob, fileName);
// };
import { saveAs } from 'file-saver';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import DOMPurify from 'dompurify';

export const downloadAsWord = (htmlContent, fileName) => {
    try {
        // Sanitize and validate HTML content
        const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

        // Ensure UTF-8 encoding is set in the HTML content
        const completeHtmlContent = `<html><head><meta charset="UTF-8"></head><body>${sanitizedHtmlContent}</body></html>`;

        // Convert HTML to a DOCX blob
        const blob = htmlDocx.asBlob(completeHtmlContent, {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        // Use FileSaver to save the file
        saveAs(blob, fileName);
    } catch (error) {
        console.error('Error converting HTML to DOCX:', error);
        // Optionally, provide feedback to the user or handle the error as needed
    }
};
