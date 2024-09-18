const createNewWordpressPage = async () => {
    const apiEndpoint = 'https://bgandg.com/wp-json/wp/v2/pages';
    const encodedFullName = encodeURIComponent(fullName + ' (' + ticker + ')');

    const jotFormScriptUrl = `https://form.jotform.com/jsform/233467061911151?caseType=${encodedFullName}`;
    const htmlBlock = `<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="${jotFormScriptUrl}"></script>`;  

    const fullContent = generatedContentSite + htmlBlock;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(wpUsername + ':' + wpPassword)}`,
    };

    let featuredImageId = null;
    if (featuredImage) {
        try {
            featuredImageId = await uploadImage(featuredImage, wpUsername, wpPassword, 'https://bgandg.com');
        } catch (error) {
            console.error('Error uploading featured image:', error);
            setUploadStatus('Error uploading featured image.');
            setIsLoading(false);
            return;
        }
    }

    const acfData = {
        custom_banner_title: fullName,
        certification_form: { url: '#sign-up' },
        toggle_certification_form: true,
        toggle_stock: true,
        stock_shortcode: generateStockShortcode()
    };

    if (complaintDocument) {
        try {
            const uploadedDocument = await uploadDocument(complaintDocument);
            acfData.toggle_complaint = true;
            acfData.complaint_document = uploadedDocument.id;
        } catch (error) {
            console.error('Error uploading document:', error);
            setUploadStatus('Error uploading document.');
            return;
        }
    }

    const folderId = folderSelection === 'cases' ? 11 : folderSelection === 'investigations' ? 13 : null;
    const tag = folderSelection === 'cases' ? 45 : folderSelection === 'investigations' ? 46 : null;

    const pageData = {
        title: fullName + ' (' + ticker + ')',
        slug: ticker,
        content: fullContent,
        status: 'publish',
        template: 'template-class-action.php',
        menu_order: -1,
        acf: acfData,
        wf_page_folders: [folderId],
        tags: [tag],
        featured_media: featuredImageId 
    };

    try {
        const response = await axios.post(apiEndpoint, pageData, { headers });
        console.log('Page created:', response.data);
        setAlertInfo({ type: 'success', message: 'Page uploaded successfully!', visible: true });

        const pressReleaseData = {
            otherExchange,
            otherFullName,
            otherShortName,
            otherTicker,
            fullName,
            shortName,
            ticker,
            caseType,
            leadPlaintiffDeadline,
            classPeriodStartDate, 
            classPeriodEndDate,
            caseDetails,
            ipoDate,
            investigationParagraph,
            purchaseDate,
            spacFullName,
            spacShortName,
            mergerDate,
            exchange,
            wordpressPageId: response.data.id,
            content: generatedContentSite,
            contentWord: generatedContentWordHTML,
        };

        await savePressReleaseToDatabase(pressReleaseData);
    } catch (error) {
        console.error('Error creating page:', error);
        setAlertInfo({ type: 'error', message: 'Error uploading page.', visible: true });
    } finally {
        setIsLoading(false);
    }
};

const updateWordpressPage = async (pageId) => {
    const apiEndpoint = `https://bgandg.com/wp-json/wp/v2/pages/${pageId}`;
    const encodedFullName = encodeURIComponent(ticker + ' (' + fullName + ')');

    const jotFormScriptUrl = `https://form.jotform.com/jsform/233467061911151?caseType=${encodedFullName}`;
    const htmlBlock = `<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="${jotFormScriptUrl}"></script>`;  
    const fullContent = generatedContentSite + htmlBlock;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(wpUsername + ':' + wpPassword)}`,
    };

    let featuredImageId = null;
    if (featuredImage) {
        try {
            featuredImageId = await uploadImage(featuredImage, wpUsername, wpPassword, 'https://bgandg.com');
        } catch (error) {
            console.error('Error uploading featured image:', error);
            setUploadStatus('Error uploading featured image.');
            setIsLoading(false);
            return;
        }
    }

    const acfData = {
        custom_banner_title: fullName,
        certification_form: { url: '#sign-up' },
        toggle_certification_form: true,
        toggle_stock: true,
        stock_shortcode: generateStockShortcode()
    };

    if (complaintDocument) {
        try {
            const uploadedDocument = await uploadDocument(complaintDocument);
            acfData.toggle_complaint = true;
            acfData.complaint_document = uploadedDocument.id;
        } catch (error) {
            console.error('Error uploading document:', error);
            setUploadStatus('Error uploading document.');
            return;
        }
    }

    const pageData = {
        title: fullName + ' (' + ticker + ')',
        content: fullContent,
        acf: acfData,
        featured_media: featuredImageId 
    };

    try {
        console.log("Updating WordPress page with data:", pageData);
        const response = await axios.put(apiEndpoint, pageData, { headers });
        console.log('Page updated:', response.data);
        setAlertInfo({ type: 'success', message: 'Page updated successfully!', visible: true });

        const updatedPressReleaseData = {
            otherExchange,
            otherFullName,
            otherShortName,
            otherTicker,
            fullName,
            shortName,
            ticker,
            caseType,
            leadPlaintiffDeadline,
            classPeriodStartDate,
            classPeriodEndDate,
            caseDetails,
            ipoDate,
            investigationParagraph,
            purchaseDate,
            spacFullName,
            spacShortName,
            mergerDate,
            exchange,
            wordpressPageId: response.data.id,
            content: generatedContentSite,
            contentWord: generatedContentWordHTML,
        };

        await updatePressReleaseInDatabase(updatedPressReleaseData);
    } catch (error) {
        console.error('Error updating page:', error);
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
        setAlertInfo({ type: 'error', message: 'Error updating page.', visible: true });
    } finally {
        setIsLoading(false);
    }
};

const uploadImage = async (imageFile, wpUsername, wpPassword, websiteUrl) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Basic ${window.btoa(`${wpUsername}:${wpPassword}`)}`
    };

    try {
        const response = await axios.post(`${websiteUrl}/wp-json/wp/v2/media`, formData, { headers });
        return response.data.id;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const updatePressReleaseInDatabase = async (data) => {
    try {
        const response = await axios.put('/.netlify/functions/updatePressRelease', data);
        if (response.status === 200) {
            console.log('Press release updated in database:', response.data);
        } else {
            console.error('Failed to update press release in database');
        }
    } catch (error) {
        console.error('Error updating press release in database:', error);
    }
};

const savePressReleaseToDatabase = async (data) => {
    try {
        await axios.post('/.netlify/functions/savePressRelease', data);
        console.log('Press release saved to database');
    } catch (error) {
        console.error('Error saving press release:', error);
    }
};

const uploadDocument = async (document) => {
    const formData = new FormData();
    formData.append('file', document);

    const uploadHeaders = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Basic ${window.btoa(wpUsername + ':' + wpPassword)}`,
    };

    try {
        const response = await axios.post('https://bgandg.com/wp-json/wp/v2/media', formData, { headers: uploadHeaders });
        return response.data; 
    } catch (error) {
        console.error('Error uploading document:', error);
        throw error;
    }
};
