import uploadImage from './uploadImage';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Tabs, Row, Col, Card, Upload, Spin, Alert, AutoComplete} from 'antd';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { downloadAsWord } from './download';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import stockData from './stock.json'; 
import './App.css';
import { useLocation } from 'react-router-dom';

import {
    generate_ipo_html,
    generate_class_period_html,
    generate_class_period_and_ipo_html,
    generate_derivative_investigation_html,
    generate_spac_investigation_html,
    generate_10b_investigation_html,
    generate_mergers_investigation_html,
    generate_ipo_site,
    generate_class_period_site,
    generate_class_period_and_ipo_site,
    generate_derivative_investigation_site,
    generate_spac_investigation_site,
    generate_10b_investigation_site,
    generate_mergers_investigation_site
} from './generate';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

const MainContent = () => {
    const location = useLocation();
    const pressReleaseData = location.state?.pressRelease;

    const [fullName, setFullName] = useState('');
    const [shortName, setShortName] = useState('');
    const [ticker, setTicker] = useState('');
    const [caseType, setCaseType] = useState('');
    const [leadPlaintiffDeadline, setLeadPlaintiffDeadline] = useState("");
    const [classPeriodStartDate, setClassPeriodStartDate] = useState("");
    const [classPeriodEndDate, setClassPeriodEndDate] = useState("");
    const [caseDetails, setCaseDetails] = useState("");
    const [ipoDate, setIpoDate] = useState('');
    const [investigationParagraph, setInvestigationParagraph] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [spacFullName, setSpacFullName] = useState('');
    const [spacShortName, setSpacShortName] = useState('');
    const [mergerDate, setMergerDate] = useState('');
    const [generatedContentSite, setGeneratedContentSite] = useState('');
    const [generatedContentWordHTML, setGeneratedContentWordHTML] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [folderSelection, setFolderSelection] = useState('');
    const [complaintDocument, setComplaintDocument] = useState(null);
    const exchanges = ['NYSE', 'NASDAQ', 'OTCMKTS', 'Other'];
    const [exchange, setExchange] = useState("");
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ type: '', message: '', visible: false });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [tickerOptions, setTickerOptions] = useState([]);
    const [form] = Form.useForm();

    const [otherFullName, setOtherFullName] = useState('');
    const [otherShortName, setOtherShortName] = useState('');
    const [otherExchange, setOtherExchange] = useState('');
    const [otherTicker, setOtherTicker] = useState('');

    useEffect(() => {
        if (pressReleaseData) {
            form.setFieldsValue({
                otherTicker: pressReleaseData.otherTicker || '',
                otherFullName: pressReleaseData.otherFullName || '',
                otherShortName: pressReleaseData.otherShortName || '',
                otherExchange: pressReleaseData.otherExchange || '',
                ticker: pressReleaseData.ticker || '',
                fullName: pressReleaseData.fullName || '',
                shortName: pressReleaseData.shortName || '',
                caseType: pressReleaseData.caseType || '',
                leadPlaintiffDeadline: pressReleaseData.leadPlaintiffDeadline ? moment(pressReleaseData.leadPlaintiffDeadline) : null,
                classPeriodStartDate: pressReleaseData.classPeriodStartDate ? moment(pressReleaseData.classPeriodStartDate) : null,
                classPeriodEndDate: pressReleaseData.classPeriodEndDate ? moment(pressReleaseData.classPeriodEndDate) : null,
                caseDetails: pressReleaseData.caseDetails || '',
                ipoDate: pressReleaseData.ipoDate ? moment(pressReleaseData.ipoDate) : null,
                investigationParagraph: pressReleaseData.investigationParagraph || '',
                purchaseDate: pressReleaseData.purchaseDate ? moment(pressReleaseData.purchaseDate) : null,
                spacFullName: pressReleaseData.spacFullName || '',
                spacShortName: pressReleaseData.spacShortName || '',
                mergerDate: pressReleaseData.mergerDate ? moment(pressReleaseData.mergerDate) : null,
                exchange: pressReleaseData.exchange || '',
            });
    
            setOtherTicker(pressReleaseData.otherTicker || '');
            setOtherFullName(pressReleaseData.otherFullName || '');
            setOtherShortName(pressReleaseData.otherShortName || '');
            setOtherExchange(pressReleaseData.otherExchange || '');
            setTicker(pressReleaseData.ticker || '');
            setFullName(pressReleaseData.fullName || '');
            setShortName(pressReleaseData.shortName || '');
            setCaseType(pressReleaseData.caseType || '');
            setLeadPlaintiffDeadline(pressReleaseData.leadPlaintiffDeadline ? moment(pressReleaseData.leadPlaintiffDeadline) : null);
            setClassPeriodStartDate(pressReleaseData.classPeriodStartDate ? moment(pressReleaseData.classPeriodStartDate) : null);
            setClassPeriodEndDate(pressReleaseData.classPeriodEndDate ? moment(pressReleaseData.classPeriodEndDate) : null);
            setCaseDetails(pressReleaseData.caseDetails || '');
            setIpoDate(pressReleaseData.ipoDate ? moment(pressReleaseData.ipoDate) : null);
            setInvestigationParagraph(pressReleaseData.investigationParagraph || '');
            setPurchaseDate(pressReleaseData.purchaseDate ? moment(pressReleaseData.purchaseDate) : null);
            setSpacFullName(pressReleaseData.spacFullName || '');
            setSpacShortName(pressReleaseData.spacShortName || '');
            setMergerDate(pressReleaseData.mergerDate ? moment(pressReleaseData.mergerDate) : null);
            setExchange(pressReleaseData.exchange || '');
            setGeneratedContentSite(pressReleaseData.content || '');
            setGeneratedContentWordHTML(pressReleaseData.contentWord || '');
        }
    }, [pressReleaseData, form]);

    const wpUsername = process.env.REACT_APP_WP_USERNAME;
    const wpPassword = process.env.REACT_APP_WP_APP_PASSWORD;

    const cases = ['Class period', 'IPO', 'Class period and IPO', '10b investigation', 'Derivative investigation', 'SPAC investigation', 'Mergers investigation'];
    
    const handleSearch = (value) => {
        setTickerOptions(
            !value ? [] : stockData.filter(stock => 
                stock.ticker.toLowerCase().startsWith(value.toLowerCase())
            ).map(stock => ({
                value: stock.ticker,
                label: `${stock.ticker} - ${stock.name} - ${stock.exchange}`
            }))
        );
    };
    
    const handleNameSearch = (value) => {
        setTickerOptions(
            !value ? [] : stockData.filter(stock => 
                stock.name.toLowerCase().startsWith(value.toLowerCase())
            ).map(stock => ({
                value: stock.name, 
                label: `${stock.name} (${stock.ticker} - ${stock.exchange})`,
                key: `${stock.name}-${stock.ticker}`
            }))
        );
    };
    
    const onSelectTicker = (value, option) => {
        const selectedStock = stockData.find(stock => stock.ticker === value);
        if (selectedStock) {
            setFullName(selectedStock.name);
            setTicker(selectedStock.ticker);
            setExchange(selectedStock.exchange);

            form.setFieldsValue({
                fullName: selectedStock.name,
                ticker: selectedStock.ticker,
                exchange: selectedStock.exchange
            });
        }
    };
    
    const onSelectFullName = (value, option) => {
        const selectedStock = stockData.find(stock => stock.name === value);
        if (selectedStock) {
            setFullName(selectedStock.name);
            setTicker(selectedStock.ticker);
            setExchange(selectedStock.exchange);

            form.setFieldsValue({
                fullName: selectedStock.name,
                ticker: selectedStock.ticker,
                exchange: selectedStock.exchange
            });
        }
    };
    
    const handleSubmit = async () => {
        setUploadStatus('');
        let generatedReleaseWordHTML = '';
        let generatedReleaseSite = '';

        if (caseType === 'SPAC investigation') {
            generatedReleaseWordHTML = generate_spac_investigation_html(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            generatedReleaseSite = generate_spac_investigation_site(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
        } else if (caseType === 'Mergers investigation') {
            generatedReleaseWordHTML = generate_mergers_investigation_html(fullName, shortName, exchange, ticker, otherFullName, otherShortName, otherExchange, otherTicker, investigationParagraph);
            generatedReleaseSite = generate_mergers_investigation_site(fullName, shortName, exchange, ticker, otherFullName, otherShortName, otherExchange, otherTicker, investigationParagraph);
        } else if (caseType === '10b investigation') {
            generatedReleaseWordHTML = generate_10b_investigation_html(fullName, shortName, exchange, ticker, investigationParagraph);
            generatedReleaseSite = generate_10b_investigation_site(fullName, shortName, exchange, ticker, investigationParagraph);
        } else if (caseType === 'Derivative investigation') {
            generatedReleaseWordHTML = generate_derivative_investigation_html(fullName, ticker, shortName, exchange, purchaseDate);
            generatedReleaseSite = generate_derivative_investigation_site(fullName, ticker, shortName, exchange, purchaseDate);
        } else if (caseType === 'Class period and IPO') {
            generatedReleaseWordHTML = generate_class_period_and_ipo_html(fullName, ticker, shortName, exchange, ipoDate, classPeriodStartDate, classPeriodEndDate, caseDetails, leadPlaintiffDeadline);
            generatedReleaseSite = generate_class_period_and_ipo_site(fullName, ticker, shortName, exchange, ipoDate, classPeriodStartDate, classPeriodEndDate, caseDetails, leadPlaintiffDeadline);
        } else if (caseType === 'IPO') {
            generatedReleaseWordHTML = generate_ipo_html(fullName, ticker, shortName, exchange, ipoDate, caseDetails, leadPlaintiffDeadline);
            generatedReleaseSite = generate_ipo_site(fullName, ticker, shortName, exchange, ipoDate, caseDetails, leadPlaintiffDeadline);
        } else if (caseType === 'Class period') {
            generatedReleaseWordHTML = generate_class_period_html(fullName, ticker, shortName, exchange, classPeriodStartDate, classPeriodEndDate, caseDetails, leadPlaintiffDeadline);
            generatedReleaseSite = generate_class_period_site(fullName, ticker, shortName, exchange, classPeriodStartDate, classPeriodEndDate, caseDetails, leadPlaintiffDeadline);
        }

        setGeneratedContentSite(generatedReleaseSite);
        setGeneratedContentWordHTML(generatedReleaseWordHTML);
    };

    const handleExchangeChange = (value) => {
        if (value === "Other") {
            setShowCustomInput(true);
        } else {
            setExchange(value);
            setShowCustomInput(false);
        }
    };
    
    const handleImageUpload = ({ fileList: newFileList }) => {
        if (newFileList.length > 0) {
            const lastFile = newFileList[newFileList.length - 1].originFileObj;
            setFeaturedImage(lastFile); 
        } else {
            setFeaturedImage(null); 
        }
    };

    const handleContentWordChange = (event, editor) => {
        const data = editor.getData();
        setGeneratedContentWordHTML(data);
        console.log('Generated word on change: ', data);
    };
    
    const handleContentSiteChange = (event, editor) => {
        const data = editor.getData();
        setGeneratedContentSite(data);
        console.log('Generated site content on change: ', data);
    };
    
    const handleCaseTypeChange = (value) => {
        setCaseType(value);
    
        if (['Class period', 'IPO', 'Class period and IPO'].includes(value)) {
            setFolderSelection('cases');
        } else if (['10b investigation', 'Derivative investigation', 'SPAC investigation'].includes(value)) {
            setFolderSelection('investigations');
        }
    };

    const generateStockShortcode = () => {
        let stockExchange = exchange === "NYSE" || exchange === "NASDAQ" ? "NYSENasdaq" : exchange;
        return `[stockdio-historical-chart stockExchange="${stockExchange}" symbol="${ticker}" includeImage="true" includeDescription="true" culture="English-US" includeRelated="true"]`;
    };

    const checkDatabaseForPage = async (ticker) => {
        try {
            const response = await axios.get('/.netlify/functions/checkIfPageExists', { params: { ticker } });
            if (response.status === 200 && response.data.wordpressPageId) {
                return response.data.wordpressPageId;
            }
            return null;
        } catch (error) {
            console.error('Error checking for page:', error);
            return null;
        }
    };

    const createPage = async () => {
        setIsLoading(true);
        const existingPageId = await checkDatabaseForPage(ticker);
        if (existingPageId) {
            await updateWordpressPage(existingPageId);
        } else {
            await createNewWordpressPage();
        }
        setTimeout(() => setAlertInfo({ ...alertInfo, visible: false }), 3000); 
        setIsLoading(false);
    };

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

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        if (newFileList.length > 0) {
            const lastFile = newFileList[newFileList.length - 1];
            setComplaintDocument(lastFile.originFileObj);
        } else {
            setComplaintDocument(null); 
        }
    };

    const copyToClipboard = async text => {
        try {
            if ('clipboard' in navigator) {
                await navigator.clipboard.writeText(text);
                setShowCopyAlert(true);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setShowCopyAlert(true);
            }
            setTimeout(() => setShowCopyAlert(false), 3000); 
        } catch (error) {
            console.error('Failed to copy text to clipboard', error);
        }
    };

    const handleUploadToSite = () => {
        createPage();
    };

    const tabs = [
        {
            label: 'Newswire Version',
            key: 'newswire',
            children: (
                <>
                    {generatedContentWordHTML && (
                        <>
                            <Form.Item label="">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={generatedContentWordHTML}
                                    onChange={handleContentWordChange}
                                />
                            </Form.Item>
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        downloadAsWord(generatedContentWordHTML, `${shortName}-${ticker}.docx`);
                                    }}
                                >
                                    Download Word Doc
                                </Button>

                                <Button type="default" style={{ marginLeft: '10px' }} onClick={() => copyToClipboard(generatedContentWordHTML)}>
                                    Copy text
                                </Button>
                                {showCopyAlert && (
                                    <Alert
                                        message="Content copied to clipboard"
                                        type="success"
                                        showIcon
                                        style={{ marginTop: '10px' }}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </>
            ),
        },
        {
            label: 'bgandg.com Version',
            key: 'site',
            children: (
                <>
                    {generatedContentSite && (
                        <>
                            <Form.Item label="">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={generatedContentSite}
                                    onChange={handleContentSiteChange}
                                />
                            </Form.Item>

                            <Form layout="vertical">
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item label="">
                                            <Upload.Dragger
                                                name="file"
                                                beforeUpload={() => false} 
                                                onChange={handleImageUpload}
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <UploadOutlined />
                                                </p>
                                                <p className="ant-upload-text">Upload featured image</p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                        {folderSelection === 'cases' && (
                                            <Form.Item label="" name="complaintDocument">
                                                <Dragger
                                                    beforeUpload={() => false} 
                                                    onChange={handleFileChange}
                                                    fileList={fileList} 
                                                >
                                                    <p className="ant-upload-drag-icon">
                                                        <UploadOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">Upload complaint document</p>
                                                </Dragger>
                                            </Form.Item>
                                        )}
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24} style={{ textAlign: 'center' }}>
                                        {isLoading ? (
                                            <Spin />
                                        ) : (
                                            <Button type="primary" onClick={handleUploadToSite}>Upload to bgandg.com</Button>
                                        )}

                                        <Button type="default" style={{ marginLeft: '10px' }} onClick={() => copyToClipboard(generatedContentSite)}>
                                            Copy text
                                        </Button>
                                        {
                                            alertInfo.visible && (
                                                <Alert
                                                    message={alertInfo.message}
                                                    type={alertInfo.type}
                                                    showIcon
                                                    style={{ marginTop: '20px' }}
                                                />
                                            )
                                        }
                                        {showCopyAlert && (
                                            <Alert
                                                message="Content copied to clipboard"
                                                type="success"
                                                showIcon
                                                style={{ marginTop: '20px' }}
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </Form>
                            {uploadStatus && <p className="status-message">{uploadStatus}</p>}
                        </>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="app">
            <main>
                <Card className="form-container">
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Row gutter={24}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item 
                                    label="Ticker" 
                                    name="ticker"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <AutoComplete
                                        options={tickerOptions}
                                        onSearch={handleSearch}
                                        onSelect={onSelectTicker}
                                        placeholder="Enter ticker"
                                        value={ticker} 
                                        onChange={setTicker} 
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item 
                                    label="Full Name" 
                                    name="fullName"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <AutoComplete
                                        options={tickerOptions}
                                        onSearch={handleNameSearch}
                                        onSelect={onSelectFullName}
                                        placeholder="Enter full name"
                                        value={fullName} 
                                        onChange={setFullName} 
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col xs={24} sm={24} md={8} lg={4} xl={4}>
                                <Form.Item
                                    label="Exchange"
                                    name="exchange"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Select placeholder="exchange" value={showCustomInput ? "Other" : exchange} onChange={handleExchangeChange}>
                                        <Option value="" disabled>Select an exchange</Option>
                                        {exchanges.map((item, index) => (
                                            <Option key={index} value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                    {showCustomInput && (
                                        <Input
                                            type="text"
                                            placeholder="custom exchange"
                                            value={exchange}
                                            onChange={e => setExchange(e.target.value)}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={8} xl={8}>
                                <Form.Item 
                                    label="Short Name" 
                                    name="shortName"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Input placeholder="short name" value={shortName} onChange={e => setShortName(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <Form.Item
                                    label="Case Type"
                                    name="caseType"
                                    rules={[{ required: true, message: '' }]}
                                >
                                    <Select placeholder="case type" value={caseType} onChange={handleCaseTypeChange}>
                                        <Option value="" disabled>Select case type</Option>
                                        {cases.map((item, index) => (
                                            <Option key={index} value={item}>{item}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Additional forms based on caseType */}
                        {caseType === 'IPO' && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        label="IPO Date"
                                        name="ipoDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="IPO Date" value={ipoDate} style={{ width: '100%' }} onChange={setIpoDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Form.Item
                                        label="Lead Plaintiff Deadline"
                                        name="leadPlaintiffDeadline"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Lead Plaintiff Deadline" value={leadPlaintiffDeadline} style={{ width: '100%' }} onChange={setLeadPlaintiffDeadline} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Case Details"
                                        name="caseDetails"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <TextArea placeholder="Case Details" value={caseDetails} onChange={e => setCaseDetails(e.target.value)} rows={6}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {caseType === 'Class period' && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                    <Form.Item
                                        label="Class Period Start Date"
                                        name="classPeriodStartDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Class Period Start Date" value={classPeriodStartDate} style={{ width: '100%' }} onChange={setClassPeriodStartDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                    <Form.Item
                                        label="Class Period End Date"
                                        name="classPeriodEndDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Class Period End Date" value={classPeriodEndDate} style={{ width: '100%' }} onChange={setClassPeriodEndDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}> 
                                    <Form.Item
                                        label="Lead Plaintiff Deadline"
                                        name="leadPlaintiffDeadline"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Lead Plaintiff Deadline" value={leadPlaintiffDeadline} style={{ width: '100%' }} onChange={setLeadPlaintiffDeadline} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>  
                                    <Form.Item
                                        label="Case Details"
                                        name="caseDetails"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <TextArea placeholder="Case Details" value={caseDetails} onChange={e => setCaseDetails(e.target.value)} rows={6}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {caseType === 'Class period and IPO' && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                                    <Form.Item
                                        label="IPO Date"
                                        name="ipoDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="IPO Date" value={ipoDate} style={{ width: '100%' }} onChange={setIpoDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}> 
                                    <Form.Item
                                        label="Class Period Start Date"
                                        name="classPeriodStartDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Class Period Start Date" value={classPeriodStartDate} style={{ width: '100%' }} onChange={setClassPeriodStartDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>  
                                    <Form.Item
                                        label="Class Period End Date"
                                        name="classPeriodEndDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Class Period End Date" value={classPeriodEndDate} style={{ width: '100%' }} onChange={setClassPeriodEndDate} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>  
                                    <Form.Item
                                        label="Lead Plaintiff Deadline"
                                        name="leadPlaintiffDeadline"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Lead Plaintiff Deadline" value={leadPlaintiffDeadline} style={{ width: '100%' }} onChange={setLeadPlaintiffDeadline} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>  
                                    <Form.Item
                                        label="Case Details"
                                        name="caseDetails"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <TextArea placeholder="Case Details" value={caseDetails} onChange={e => setCaseDetails(e.target.value)} rows={6}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {caseType === '10b investigation' && (
                            <Row gutter={16}>
                                <Col span={24}>  
                                    <Form.Item
                                        label="Investigation Details"
                                        name="investigationParagraph"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <TextArea placeholder="Details of the investigation" value={investigationParagraph} onChange={e => setInvestigationParagraph(e.target.value)} rows={6} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {caseType === 'Derivative investigation' && (
                            <Row gutter={16}>
                                <Col span={24}>  
                                    <Form.Item
                                        label="Date of Purchase"
                                        name="purchaseDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Date of Purchase" value={purchaseDate} style={{ width: '100%' }} onChange={setPurchaseDate} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {caseType === 'SPAC investigation' && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>  
                                    <Form.Item
                                        label="SPAC Full Name"
                                        name="spacFullName"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <Input placeholder="SPAC Full Name" value={spacFullName} onChange={e => setSpacFullName(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>  
                                    <Form.Item
                                        label="SPAC Short Name"
                                        name="spacShortName"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <Input placeholder="SPAC Short Name" value={spacShortName} onChange={e => setSpacShortName(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>   
                                    <Form.Item
                                        label="Merger Date"
                                        name="mergerDate"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <DatePicker placeholder="Merger Date" value={mergerDate} style={{ width: '100%' }} onChange={setMergerDate} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        {caseType === 'Mergers investigation' && (
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>   
                                    <Form.Item
                                        label="Other Full Name"
                                        name="otherFullName"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <Input placeholder="Other Full Name" value={otherFullName} onChange={e => setOtherFullName(e.target.value)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>  
                                    <Form.Item
                                        label="Other Short Name"
                                        name="otherShortName"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <Input placeholder="Other Short Name" value={otherShortName} onChange={e => setOtherShortName(e.target.value)} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>  
                                    <Form.Item
                                        label="Other Ticker"
                                        name="otherTicker"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <Input placeholder="Other ticker" value={otherTicker} onChange={e => setOtherTicker(e.target.value)} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={24} lg={6} xl={6}>  
                                    <Form.Item
                                        label="Other exchange"
                                        name="otherExchange"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <Input placeholder="Other exchange" value={otherExchange} onChange={e => setOtherExchange(e.target.value)} />
                                    </Form.Item>
                                </Col>

                                <Col span={24}>  
                                    <Form.Item
                                        label="Investigation Details"
                                        name="investigationParagraph"
                                        rules={[{ required: true, message: '' }]}
                                    >
                                        <TextArea placeholder="Details of the investigation" value={investigationParagraph} onChange={e => setInvestigationParagraph(e.target.value)} rows={6} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}

                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit">Generate release</Button>
                        </Form.Item>
                    </Form>

                    {(generatedContentSite || generatedContentWordHTML) && (
                        <Tabs items={tabs} defaultActiveKey="site" className="tabs-container" />
                    )}
                </Card>
            </main>
        </div>
    );
}

export default MainContent;
