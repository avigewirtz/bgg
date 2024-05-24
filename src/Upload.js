import axios from 'axios';

export const updatePage = async (
    wordpressPageId, ticker, fullName, caseType, leadPlaintiffDeadline, 
    classPeriodStartDate, classPeriodEndDate, caseDetails, ipoDate, updatedContent
) => {
    // setIsLoading(true);
    const apiEndpoint = `https://bgandg.com/wp-json/wp/v2/pages/${wordpressPageId}`;
    const encodedFullName = encodeURIComponent(fullName + ' (' + ticker + ')');
    
    const jotFormScriptUrl = `https://form.jotform.com/jsform/233467061911151?caseType=${encodedFullName}`;
    const htmlBlock = `<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="${jotFormScriptUrl}"></script>`;  
    const fullContent = updatedContent + htmlBlock;
    
    const username = 'Shlomo'; 
    const appPassword = 'AL5YMXHMhlFIv5K237R4R9RZ';

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(username + ':' + appPassword)}`,
    };

    const folderId = 11; 
    const tag = 5;

    const pageData = {
        content: fullContent,
        status: 'publish',
        template: 'template-class-action.php',
        wf_page_folders: [folderId],
        tags: tag,
    };

    try {
        const response = await axios.put(apiEndpoint, pageData, { headers });
        console.log('Page updated:', response.data);
        // setAlertInfo({ type: 'success', message: 'Page updated successfully!', visible: true });

        const pressReleaseData = {
            ticker,
            caseType,
            leadPlaintiffDeadline,
            classPeriodStartDate,
            classPeriodEndDate,
            caseDetails,
            ipoDate,
            content: updatedContent, 
    };  await savePressReleaseToDatabase(pressReleaseData);
} catch (error) {
        console.error('Error updating page:', error);
        // setAlertInfo({ type: 'error', message: 'Error updating page.', visible: true });
    } finally {
        // setIsLoading(false);
    }
    // setTimeout(() => setAlertInfo({ ...alertInfo, visible: false }), 3000); 
};


const savePressReleaseToDatabase = async (data) => {
    try {
        await axios.post('/.netlify/functions/updatePressRelease', data);
        console.log('Press release saved to database');
    } catch (error) {
        console.error('Error saving press release:', error);
    }
};