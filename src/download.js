import { saveAs } from 'file-saver';
import * as htmlDocx from 'html-docx-js/dist/html-docx';

export const downloadAsWord = (htmlContent, fileName) => {
    // Replace special characters with HTML entities
    // htmlContent = htmlContent
    //     .replace(/'/g, '&#39;') // Apostrophe
    //     .replace(/"/g, '&quot;') // Quotation mark
    //     .replace(/&/g, '&amp;')  // Ampersand
    //     .replace(/</g, '&lt;')   // Less than
    //     .replace(/>/g, '&gt;');  // Greater than

    // Ensure UTF-8 encoding is set in the HTML content
    if (!htmlContent.includes('<meta charset="UTF-8">')) {
        htmlContent = `<html><head><meta charset="UTF-8"></head><body>${htmlContent}</body></html>`;
    }

    // Convert HTML to a DOCX blob
    const blob = htmlDocx.asBlob(htmlContent, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Use FileSaver to save the file
    saveAs(blob, fileName);
};
