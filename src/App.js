import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Tabs, Row, Col, Card, Upload, Spin, Alert, AutoComplete} from 'antd';
import axios from 'axios';
import uploadImage from './uploadImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { downloadAsWord } from './download';
import Header from './Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PressReleaseHistory from './PressReleaseHistory';

import { UploadOutlined } from '@ant-design/icons';
import stockData from './stock.json'; 
import './App.css';

import {

    generate_ipo_html,
    generate_class_period_html,
    generate_class_period_and_ipo_html,
    generate_derivative_investigation_html,
    generate_spac_investigation_html,
    generate_10b_investigation_html,
    generate_ipo_site,
    generate_class_period_site,
    generate_class_period_and_ipo_site,
    generate_derivative_investigation_site,
    generate_spac_investigation_site,
    generate_10b_investigation_site
} from './generate';

const { TextArea } = Input;
const { Option } = Select;
// const { Title } = Typography;
const { Dragger } = Upload;






function App() {
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









    // const username = process.env.WP_USERNAME;
    // const appPassword = process.env.WP_APP_PASSWORD;
    const username = 'Shlomo'; 
    const appPassword = 'AL5YMXHMhlFIv5K237R4R9RZ';
    const cases = ['Class period', 'IPO', 'Class period and IPO', '10b investigation', 'Derivative investigation', 'SPAC investigation'];

    
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
                value: stock.name, // Use name for the value
                label: `${stock.name} (${stock.ticker} - ${stock.exchange})`, // Differentiate with ticker and exchange
                key: `${stock.name}-${stock.ticker}` // Unique key
            }))
        );
    };
    
    
    
    const onSelectTicker = (value, option) => {
        const selectedStock = stockData.find(stock => stock.ticker === value);
        if (selectedStock) {
            setFullName(selectedStock.name); // Set the full name
            setTicker(selectedStock.ticker); // Set the ticker
            setExchange(selectedStock.exchange); // Set the exchange
            console.log('full name: ', fullName);

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
    
    const handleSubmit = () => {
    
        setUploadStatus('');
        if (caseType === 'SPAC investigation') {
            
            const generatedReleaseWordHTML = generate_spac_investigation_html(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            const generatedReleaseSite = generate_spac_investigation_site(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
         
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
           

        }
        if (caseType === '10b investigation') {
           
            const generatedReleaseWordHTML = generate_10b_investigation_html(fullName, shortName, exchange, ticker, investigationParagraph);
            const generatedReleaseSite = generate_10b_investigation_site(fullName, shortName, exchange, ticker, investigationParagraph);

            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
       
        }

        if (caseType === 'Derivative investigation') {
           
            const generatedReleaseWordHTML = generate_derivative_investigation_html(fullName, ticker, shortName, exchange, purchaseDate);
            const generatedReleaseSite = generate_derivative_investigation_site(fullName, ticker, shortName, exchange, purchaseDate);
          
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
            
        }
        if (caseType === 'Class period and IPO') {
     
            const generatedReleaseWordHTML = generate_class_period_and_ipo_html(
                fullName, ticker, shortName, exchange,
                ipoDate, classPeriodStartDate, classPeriodEndDate,
                caseDetails, leadPlaintiffDeadline
            );
            const generatedReleaseSite = generate_class_period_and_ipo_site(
                fullName, ticker, shortName, exchange,
                ipoDate, classPeriodStartDate, classPeriodEndDate,
                caseDetails, leadPlaintiffDeadline
            );
     
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);

        }
       if (caseType === 'IPO') {
   
           const generatedReleaseWordHTML = generate_ipo_html(
            fullName, ticker, shortName, exchange,
            ipoDate, caseDetails, leadPlaintiffDeadline
        );
           const generatedReleaseSite = generate_ipo_site(
            fullName, ticker, shortName, exchange,
            ipoDate, caseDetails, leadPlaintiffDeadline
        );

           setGeneratedContentSite(generatedReleaseSite);
           setGeneratedContentWordHTML(generatedReleaseWordHTML);
    
       }

       if (caseType === 'Class period') {

           const generatedReleaseWordHTML = generate_class_period_html(
            fullName, ticker, shortName, exchange,
            classPeriodStartDate, classPeriodEndDate, caseDetails,
            leadPlaintiffDeadline
        );
           const generatedReleaseSite = generate_class_period_site(
            fullName, ticker, shortName, exchange,
            classPeriodStartDate, classPeriodEndDate, caseDetails,
            leadPlaintiffDeadline
        );

           setGeneratedContentSite(generatedReleaseSite);
           setGeneratedContentWordHTML(generatedReleaseWordHTML);

       }
       
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
    
    const handleContentWordChange = (content) => {
        setGeneratedContentWordHTML(content);
    };
    
    const handleContentSiteChange = (content) => {
        setGeneratedContentSite(content);
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
    return `[stockdio-historical-chart stockExchange=”NYSENasdaq” symbol="${ticker}" includeImage="true" includeDescription="true" culture="English-US" includeRelated="true"]`;
};

const createPage = async () => {
setIsLoading(true);
const apiEndpoint = 'https://bgandg.com/wp-json/wp/v2/pages';
const encodedFullName = encodeURIComponent(ticker + ' (' + fullName + ')');


const jotFormScriptUrl = `https://form.jotform.com/jsform/233467061911151?caseType=${encodedFullName}`;


const htmlBlock = `<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="${jotFormScriptUrl}"></script>`;  
const fullContent = generatedContentSite + htmlBlock;
  

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${window.btoa(username + ':' + appPassword)}`,
  };

  const linkData = {
    url: '#sign-up', 
};


let featuredImageId = null;
if (featuredImage) {
    try {
        featuredImageId = await uploadImage(featuredImage, username, appPassword, 'https://bgandg.com');
    } catch (error) {
        console.error('Error uploading featured image:', error);
        setUploadStatus('Error uploading featured image.');
        setIsLoading(false);
        return;
    }
}


   const acfData = {
    custom_banner_title: fullName,
    certification_form: linkData,
    toggle_certification_form: true,
    toggle_stock: true,
    
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
    acfData.stock_shortcode = generateStockShortcode();
    const folderId = folderSelection === 'cases' ? 11 : 
                   folderSelection === 'investigations' ? 13 : 
                   null;

    const tag = folderSelection === 'cases' ? 45 : 
                   folderSelection === 'investigations' ? 46 : 
                   null;

const pageData = {
    title: fullName + ' (' + ticker + ')',
    slug: ticker,
    content: fullContent,
    status: 'publish',
    template: 'template-class-action.php',
    menu_order: -1,
    acf: acfData,
    wf_page_folders: [folderId],
    tags: tag,
    featured_media: featuredImageId 
};

  try {
    const response = await axios.post(apiEndpoint, pageData, { headers });
    console.log('Page created:', response.data);
    setAlertInfo({ type: 'success', message: 'Page uploaded successfully!', visible: true });

    const pressReleaseData = {
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
        content: generatedContentSite, // Assuming this is the press release content
    };
    await savePressReleaseToDatabase(pressReleaseData);
  } catch (error) {
    console.error('Error creating page:', error);
    setAlertInfo({ type: 'error', message: 'Error uploading page.', visible: true });

  }
  finally {
    setIsLoading(false); 



}
setTimeout(() => setAlertInfo({ ...alertInfo, visible: false }), 3000); 
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
      Authorization: `Basic ${window.btoa(username + ':' + appPassword)}`,
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
                    <ReactQuill
                        value={generatedContentWordHTML}
                        onChange={handleContentWordChange}
                    />
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={() => downloadAsWord(generatedContentWordHTML, `${shortName}-${ticker}.docx`)}>
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
                    <ReactQuill
                        value={generatedContentSite}
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
        
         {/* <Header /> */}
        {/* <header style={{ textAlign: 'center' }}>
                <Title level={2}>Press Release Generator</Title>
            </header> */}
        <main>
        <Router>
            <Header />
            <Routes>
                <Route path="/"  element={
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


{caseType === 'IPO' && (
    <>
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
        </Row>
    <Row gutter={16}>
    <Col span={24}>
        <Form.Item
            label="Case Details"
            name="caseDetails"
            rules={[{ required: true, message: '' }]}
        >
            <TextArea placeholder="Case Details" value={caseDetails} onChange={e => setCaseDetails(e.target.value)} />
        </Form.Item>
        </Col>
        </Row>
    </>
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
            <TextArea placeholder="Case Details" value={caseDetails} onChange={e => setCaseDetails(e.target.value)} />
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
            <TextArea placeholder="Case Details" value={caseDetails} onChange={e => setCaseDetails(e.target.value)} />
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
    <TextArea placeholder="Details of the investigation" value={investigationParagraph} onChange={e => setInvestigationParagraph(e.target.value)} />
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

<Form.Item
 
    style={{ textAlign: 'center' }} 
>
    <Button type="primary" htmlType="submit">Generate release</Button>
</Form.Item>
   </Form>

{(generatedContentSite || generatedContentWordHTML) && (
                        <Tabs items={tabs} defaultActiveKey="site" className="tabs-container" />
                    )}
     </Card>
     } />
              <Route path="/history" element={<PressReleaseHistory />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
</main>
</div>

);
}

export default App;
