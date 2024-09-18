import { saveAs } from 'file-saver';
import * as htmlDocx from 'html-docx-js/dist/html-docx';

export const downloadAsWord = (htmlContent, fileName) => {

    if (!htmlContent.includes('<meta charset="UTF-8">')) {
        htmlContent = `<html><head><meta charset="UTF-8"></head><body>${htmlContent}</body></html>`;
    }

   
    const blob = htmlDocx.asBlob(htmlContent, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });


    saveAs(blob, fileName);
};
