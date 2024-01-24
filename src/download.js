import { saveAs } from 'file-saver';
import * as htmlDocx from 'html-docx-js/dist/html-docx';

export const downloadAsWord = (htmlContent, fileName) => {


    console.log(htmlContent);
    // Convert HTML to a DOCX blob
    const blob = htmlDocx.asBlob(htmlContent, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Use FileSaver to save the file
    saveAs(blob, fileName);
};
