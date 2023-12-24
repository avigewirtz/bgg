// download.js
import { saveAs } from 'file-saver';
import * as htmlDocx from 'html-docx-js/dist/html-docx';

export const downloadAsWord = (htmlContent, fileName) => {
    const blob = htmlDocx.asBlob(htmlContent);
    saveAs(blob, fileName);
};
