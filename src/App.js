import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Tabs, Typography, Row, Col, Card, Upload, Spin, Alert, Checkbox} from 'antd';
import axios from 'axios';
import DOMPurify from 'dompurify';

import { UploadOutlined } from '@ant-design/icons';

import {downloadDocument} from './downloadWord'

import {
    generate_ipo,
    generate_class_period,
    generate_class_period_and_ipo,
    generate_derivative_investigation,
    generate_spac_investigation,
    generate_10b_investigation,
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
const { Title } = Typography;
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
    const [generatedContentWord, setGeneratedContentWord] = useState('');
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
    const [siteDisplay, setSiteDisplay] = useState('');
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ type: '', message: '', visible: false });
    const [selectedTags, setSelectedTags] = useState([]);








    // const username = process.env.WP_USERNAME;
    // const appPassword = process.env.WP_APP_PASSWORD;
    const username = 'Shlomo'; 
    const appPassword = 'AL5YMXHMhlFIv5K237R4R9RZ';
    const cases = ['Class period', 'IPO', 'Class period and IPO', '10b investigation', 'Derivative investigation', 'SPAC investigation'];

    const handleSubmit = () => {
    
        setUploadStatus('');
        if (caseType === 'SPAC investigation') {
            const generatedReleaseWord = generate_spac_investigation(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            const generatedReleaseWordHTML = generate_spac_investigation_html(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            const generatedReleaseSite = generate_spac_investigation_site(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
            setSiteDisplay('<h1>' + fullName + ' (' + ticker + ')</h1>' + generatedReleaseSite);

        }
        if (caseType === '10b investigation') {
            const generatedReleaseWord = generate_10b_investigation(fullName, shortName, exchange, ticker, investigationParagraph);
            const generatedReleaseWordHTML = generate_10b_investigation_html(fullName, shortName, exchange, ticker, investigationParagraph);
            const generatedReleaseSite = generate_10b_investigation_site(fullName, shortName, exchange, ticker, investigationParagraph);
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
            setSiteDisplay('<h1>' + fullName + ' (' + ticker + ')</h1>' + generatedReleaseSite);
        }

        if (caseType === 'Derivative investigation') {
            const generatedReleaseWord = generate_derivative_investigation(fullName, ticker, shortName, exchange, purchaseDate);
            const generatedReleaseWordHTML = generate_derivative_investigation_html(fullName, ticker, shortName, exchange, purchaseDate);
            const generatedReleaseSite = generate_derivative_investigation_site(fullName, ticker, shortName, exchange, purchaseDate);
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
            setSiteDisplay('<h1>' + fullName + ' (' + ticker + ')</h1>' + generatedReleaseSite);
        }
        if (caseType === 'Class period and IPO') {
            const generatedReleaseWord = generate_class_period_and_ipo(
                fullName, ticker, shortName, exchange,
                ipoDate, classPeriodStartDate, classPeriodEndDate,
                caseDetails, leadPlaintiffDeadline
            );
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
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);
            setGeneratedContentWordHTML(generatedReleaseWordHTML);
            setSiteDisplay('<h1>' + fullName + ' (' + ticker + ')</h1>' + generatedReleaseSite);
        }
       if (caseType === 'IPO') {
           const generatedReleaseWord = generate_ipo(
               fullName, ticker, shortName, exchange,
               ipoDate, caseDetails, leadPlaintiffDeadline
           );
           const generatedReleaseWordHTML = generate_ipo_html(
            fullName, ticker, shortName, exchange,
            ipoDate, caseDetails, leadPlaintiffDeadline
        );
           const generatedReleaseSite = generate_ipo_site(
            fullName, ticker, shortName, exchange,
            ipoDate, caseDetails, leadPlaintiffDeadline
        );
           setGeneratedContentWord(generatedReleaseWord);
           setGeneratedContentSite(generatedReleaseSite);
           setGeneratedContentWordHTML(generatedReleaseWordHTML);
           setSiteDisplay('<h1>' + fullName + ' (' + ticker + ')</h1>' + generatedReleaseSite);
       }

       if (caseType === 'Class period') {
           const generatedReleaseWord = generate_class_period(
               fullName, ticker, shortName, exchange,
               classPeriodStartDate, classPeriodEndDate, caseDetails,
               leadPlaintiffDeadline
           );
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
           setGeneratedContentWord(generatedReleaseWord);
           setGeneratedContentSite(generatedReleaseSite);
           setGeneratedContentWordHTML(generatedReleaseWordHTML);
           setSiteDisplay('<h1>' + fullName + ' (' + ticker + ')</h1>' + generatedReleaseSite);
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

// Modify the JotForm URL to include the 'caseType' field with the value of fullName
const jotFormScriptUrl = `https://form.jotform.com/jsform/233467061911151?caseType=${encodedFullName}`;

// Use the modified JotForm URL in your htmlBlock
const htmlBlock = `<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="${jotFormScriptUrl}"></script>`;  
const fullContent = generatedContentSite + htmlBlock;
  

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${window.btoa(username + ':' + appPassword)}`,
  };

  const linkData = {
    url: '#sign-up', 
};




   // Create the acf object
   const acfData = {
    custom_banner_title: fullName,
    certification_form: linkData,
    toggle_certification_form: true,
    toggle_stock: true,
    
};

// Check if there is a document to upload
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
const pageData = {
    title: fullName + ' (' + ticker + ')',
    slug: ticker,
    content: fullContent,
    status: 'publish',
    template: 'template-class-action.php',
    menu_order: -1,
    acf: acfData,
    wf_page_folders: [folderId],
    tags: selectedTags
};

  try {
    const response = await axios.post(apiEndpoint, pageData, { headers });
    console.log('Page created:', response.data);
    setAlertInfo({ type: 'success', message: 'Page uploaded successfully!', visible: true });

  } catch (error) {
    console.error('Error creating page:', error);
    setAlertInfo({ type: 'error', message: 'Error uploading page.', visible: true });

  }
  finally {
    setIsLoading(false); // Stop loading regardless of the outcome
    // Inside createPage function, after successful upload


}
setTimeout(() => setAlertInfo({ ...alertInfo, visible: false }), 3000); // Hide alert after 3 seconds
};

const handleTagChange = (checkedValues) => {
    setSelectedTags(checkedValues);
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
      return response.data;  // Return the uploaded document details
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // Assuming you want to store the last selected file as the complaint document
    if (newFileList.length > 0) {
        const lastFile = newFileList[newFileList.length - 1];
        setComplaintDocument(lastFile.originFileObj);
    } else {
        setComplaintDocument(null); // Reset if no file is selected
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
        setTimeout(() => setShowCopyAlert(false), 3000); // Alert disappears after 3 seconds
    } catch (error) {
        // Handle error scenario
    }
};




const handleUploadToSite = () => {
    createPage();
};


const handleTickerChange = (e) => {
    setTicker(e.target.value.toUpperCase());
};

const createMarkup = (htmlContent) => {
    return {
        __html: DOMPurify.sanitize(htmlContent)
    };
};


const commonStyle = {
    overflow: 'auto', padding: '4px 11px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #d9d9d9', minHeight: '100px', 
    maxHeight: '800px', 
    overflowY: 'auto',
};



const tabs = [
    {
        label: 'Newswire Version',
        key: 'newswire',
        children: (
            <>
                {generatedContentWord && (
                    <>
                    <div 
                    dangerouslySetInnerHTML={createMarkup(generatedContentWordHTML)} 
                    className="output-box" 
                    style={commonStyle}
                >
                    {/* {generatedContentWord} */}
                </div>
                <div style={{ textAlign: 'center' }}>
    <Button type="primary" onClick={() => downloadDocument(generatedContentWord, shortName + '-' + ticker)}>
        Download Word Doc
    </Button>
    <Button type="default" style={{ marginLeft: '10px' }} onClick={() => copyToClipboard(generatedContentWord)}>
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
                        <div
    dangerouslySetInnerHTML={createMarkup(siteDisplay)} 
    className="output-box" 
    style={commonStyle} 
/>
                        
                        {/* Additional questions for Site Version */}
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={24}>
                                {folderSelection === 'cases' && (
    <Form.Item label="" name="complaintDocument">
        <Dragger
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleFileChange}
            fileList={fileList} // Use fileList state here
        >
            <p className="ant-upload-drag-icon">
                <UploadOutlined />
            </p>
            <p className="ant-upload-text">Upload complaint document</p>
        </Dragger>
    </Form.Item>
)}

<Form.Item label="Select Tag(s):" name="tag">
                            <Row>
                            <Checkbox.Group style={{ width: '100%' }} onChange={handleTagChange}>
    <Row>
        <Col span={2}><Checkbox value={46}>INV</Checkbox></Col>
        <Col span={2}><Checkbox value={45}>CA</Checkbox></Col>
        <Col span={2}><Checkbox value={21}>Deadline</Checkbox></Col>
    </Row>
</Checkbox.Group>

                            </Row>
                        </Form.Item>


                                </Col>
                            </Row>
                            <Row gutter={16}>
                            <Col span={24} style={{ textAlign: 'center' }}>
    {isLoading ? (
        <Spin />
    ) : (
        <Button type="primary" onClick={handleUploadToSite}>Upload to bgandg.com</Button>
        
    )}

        <Button type="default" style={{ marginLeft: '10px' }} onClick={() => copyToClipboard(generatedContentWord)}>
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
        <header style={{ textAlign: 'center' }}>
                <Title level={1}>Press Release Generator</Title>
            </header>
        <main>

        <Card className="form-container" style={{ width: '50%', margin: '0 auto', marginBottom: '50px'}}>
        <Form 
    layout="vertical" 
    onFinish={handleSubmit} 
>
<Row gutter={16}>
        <Col span={15}>
        <Form.Item 
                            label="Full Name" 
                            name="fullName"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input placeholder="full name" value={fullName} onChange={e => setFullName(e.target.value)} />
                        </Form.Item>
                </Col>
        <Col span={9}>
        <Form.Item 
                            label="Short Name" 
                            name="shortName"
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input placeholder="short name" value={shortName} onChange={e => setShortName(e.target.value)} />
                        </Form.Item>
                </Col>
                </Row>
                <Row gutter={16}>
        <Col span={6}>
        <Form.Item 
    label="Ticker" 
    name="ticker"
    rules={[{ required: true, message: '' }]}
>
    <Input placeholder="ticker" value={ticker} onChange={handleTickerChange} />
</Form.Item>

                </Col>
    
    <Col span={7}>
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

                <Col span={11}>
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

           {/* Conditional rendering based on the case type */}
{caseType === 'IPO' && (
    <>
     <Row gutter={16}>
     <Col span={12}>
        <Form.Item
            label="IPO Date"
            name="ipoDate"
            rules={[{ required: true, message: '' }]}
        >
            <DatePicker placeholder="IPO Date" value={ipoDate} style={{ width: '100%' }} onChange={setIpoDate} />
         
        </Form.Item>
</Col>
<Col span={12}>
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
           <Col span={8}>  
       <Form.Item
            label="Lead Plaintiff Deadline"
            name="leadPlaintiffDeadline"
            rules={[{ required: true, message: '' }]}
        >
            <DatePicker placeholder="Lead Plaintiff Deadline" value={leadPlaintiffDeadline} style={{ width: '100%' }} onChange={setLeadPlaintiffDeadline} />
        </Form.Item>
</Col>
<Col span={8}>  
        <Form.Item
            label="Class Period Start Date"
            name="classPeriodStartDate"
            rules={[{ required: true, message: '' }]}
        >
            <DatePicker placeholder="Class Period Start Date" value={classPeriodStartDate} style={{ width: '100%' }} onChange={setClassPeriodStartDate} />
        </Form.Item>
</Col>
<Col span={8}>  
        <Form.Item
            label="Class Period End Date"
            name="classPeriodEndDate"
            rules={[{ required: true, message: '' }]}
        >
            <DatePicker placeholder="Class Period End Date" value={classPeriodEndDate} style={{ width: '100%' }} onChange={setClassPeriodEndDate} />
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
            <Col span={6}>  
        <Form.Item
    label="IPO Date"
    name="ipoDate"
    rules={[{ required: true, message: '' }]}
>
    <DatePicker placeholder="IPO Date" value={ipoDate} style={{ width: '100%' }} onChange={setIpoDate} />
</Form.Item>
</Col>
<Col span={6}>  
<Form.Item
    label="Class Period Start Date"
    name="classPeriodStartDate"
    rules={[{ required: true, message: '' }]}
>
    <DatePicker placeholder="Class Period Start Date" value={classPeriodStartDate} style={{ width: '100%' }} onChange={setClassPeriodStartDate} />
</Form.Item>
</Col>
<Col span={6}>  
<Form.Item
    label="Class Period End Date"
    name="classPeriodEndDate"
    rules={[{ required: true, message: '' }]}
>
    <DatePicker placeholder="Class Period End Date" value={classPeriodEndDate} style={{ width: '100%' }} onChange={setClassPeriodEndDate} />
</Form.Item>
</Col>
<Col span={6}>  
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
          <Col span={8}>  
        <Form.Item
            label="SPAC Full Name"
            name="spacFullName"
            rules={[{ required: true, message: '' }]}
        >
            <Input placeholder="SPAC Full Name" value={spacFullName} onChange={e => setSpacFullName(e.target.value)} />
        </Form.Item>
</Col>
<Col span={8}>  
        <Form.Item
            label="SPAC Short Name"
            name="spacShortName"
            rules={[{ required: true, message: '' }]}
        >
            <Input placeholder="SPAC Short Name" value={spacShortName} onChange={e => setSpacShortName(e.target.value)} />
        </Form.Item>
</Col>
<Col span={8}>  
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
 
    style={{ textAlign: 'center' }} // Center the button within the Form.Item
>
    <Button type="primary" htmlType="submit">Generate release</Button>
</Form.Item>
   </Form>
{/* {errorMessage && <Alert message={errorMessage} type="error" showIcon />} */}

{/* Tabs with content */}
{(generatedContentWord || generatedContentSite) && (
                        <Tabs items={tabs} defaultActiveKey="newswire" className="tabs-container" />
                    )}
     </Card>
</main>
</div>

);
}

export default App;
