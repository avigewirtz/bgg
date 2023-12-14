import React, { useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import './App.css';

import {downloadDocument} from './downloadWord'

import {
    generate_ipo,
    generate_class_period,
    generate_class_period_and_ipo,
    generate_derivative_investigation,
    generate_spac_investigation,
    generate_10b_investigation,
    generate_ipo_site,
    generate_class_period_site,
    generate_class_period_and_ipo_site,
    generate_derivative_investigation_site,
    generate_spac_investigation_site,
    generate_10b_investigation_site
} from './generate';


function App() {
    const [fullName, setFullName] = useState('');
    const [shortName, setShortName] = useState('');
    const [ticker, setTicker] = useState('');
    const [caseType, setCaseType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [leadPlaintiffDeadline, setLeadPlaintiffDeadline] = useState("");
    const [classPeriodStartDate, setClassPeriodStartDate] = useState("");
    const [classPeriodEndDate, setClassPeriodEndDate] = useState("");
    const [caseDetails, setCaseDetails] = useState("");
    const [ipoDate, setIpoDate] = useState('');
    const [investigationParagraph, setInvestigationParagraph] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [spacFullName, setSpacFullName] = useState('');
    // const [stockExchange, setStockExchange] = useState('');
    // const [stockShortcode, setStockShortcode] = useState('');
    const [spacShortName, setSpacShortName] = useState('');
    const [mergerDate, setMergerDate] = useState('');
    const [generatedContentWord, setGeneratedContentWord] = useState('');
    const [generatedContentSite, setGeneratedContentSite] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [folderSelection, setFolderSelection] = useState('');

    // const [showCountdown, setShowCountdown] = useState(false);
// const [showComplaint, setShowComplaint] = useState(false);
// const [showCertification, setShowCertification] = useState(false);
// const [showStock, setShowStock] = useState(false);
const [complaintDocument, setComplaintDocument] = useState(null);



    // const { TabPane } = Tabs;

    const exchanges = ['NYSE', 'NASDAQ', 'OTCMKTS', 'Other'];
    const [exchange, setExchange] = useState("");

    // const username = process.env.WP_USERNAME;
    // const appPassword = process.env.WP_APP_PASSWORD;
    
    const username = 'Shlomo'; 
    const appPassword = 'AL5YMXHMhlFIv5K237R4R9RZ';

    const cases = ['Class period', 'IPO', 'Class period and IPO', '10b investigation', 'Derivative investigation', 'SPAC investigation'];

    const handleSubmit = () => {
        if (!fullName || !shortName || !ticker || !exchange || !caseType) {
            setErrorMessage('Please fill in all fields and make your choices.');
            return;
        }
        setUploadStatus('');
        if (caseType === 'SPAC investigation') {
            const generatedReleaseWord = generate_spac_investigation(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            const generatedReleaseSite = generate_spac_investigation_site(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);

        }
        if (caseType === '10b investigation') {
            const generatedReleaseWord = generate_10b_investigation(fullName, shortName, exchange, ticker, investigationParagraph);
            const generatedReleaseSite = generate_10b_investigation_site(fullName, shortName, exchange, ticker, investigationParagraph);
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);
        }

        if (caseType === 'Derivative investigation') {
            const generatedReleaseWord = generate_derivative_investigation(fullName, ticker, shortName, exchange, purchaseDate);
            const generatedReleaseSite = generate_derivative_investigation_site(fullName, ticker, shortName, exchange, purchaseDate);
            setGeneratedContentWord(generatedReleaseWord);
            setGeneratedContentSite(generatedReleaseSite);
        }
        if (caseType === 'Class period and IPO') {
            const generatedReleaseWord = generate_class_period_and_ipo(
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
        }
       if (caseType === 'IPO') {
           const generatedReleaseWord = generate_ipo(
               fullName, ticker, shortName, exchange,
               ipoDate, caseDetails, leadPlaintiffDeadline
           );
           const generatedReleaseSite = generate_ipo_site(
            fullName, ticker, shortName, exchange,
            ipoDate, caseDetails, leadPlaintiffDeadline
        );
           setGeneratedContentWord(generatedReleaseWord);
           setGeneratedContentSite(generatedReleaseSite);
       }

       if (caseType === 'Class period') {
           const generatedReleaseWord = generate_class_period(
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
       }

    };

    const handleExchangeChange = (e) => {
        const value = e.target.value;
        if (value === "Other") {
            setShowCustomInput(true);
        } else {
            setExchange(value);
            setShowCustomInput(false);
        }
    };
    


const generateStockShortcode = () => {
    return `[stockdio-historical-chart stockExchange=”NYSENasdaq” symbol="${ticker}" includeImage="true" includeDescription="true" culture="English-US" includeRelated="true"]`;
};

const createPage = async () => {
  const apiEndpoint = 'https://bgandg.com/wp-json/wp/v2/pages';
//   const username = 'Shlomo'; 
//   const appPassword = 'AL5YMXHMhlFIv5K237R4R9RZ';
//  const htmlBlock = '<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="https://form.jotform.com/jsform/233467061911151"></script>';
// Encode fullName to be URL-safe
const encodedFullName = encodeURIComponent(fullName);

// Modify the JotForm URL to include the 'caseType' field with the value of fullName
const jotFormScriptUrl = `https://form.jotform.com/jsform/233467061911151?caseType=${encodedFullName}`;

// Use the modified JotForm URL in your htmlBlock
const htmlBlock = `<style>#footer .contact-form {display: none !important;}</style><a id="sign-up"></a><script type="text/javascript" src="${jotFormScriptUrl}"></script>`;  
const fullContent = generatedContentSite + htmlBlock;
  // const stockShortcode = generateStockShortcode();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${window.btoa(username + ':' + appPassword)}`,
  };

  const linkData = {
    url: '#sign-up', // The URL of the link
    // title: 'Clio intake form', // The text of the link that will be displayed
};




   // Create the acf object
   const acfData = {
    custom_banner_title: fullName,
    certification_form: linkData,
    toggle_certification_form: true,
    toggle_stock: true,
    // toggle_countdown: showCountdown,
    // toggle_complaint: showComplaint,
};

// Check if there is a document to upload
if (complaintDocument) {
    try {
      // Upload the document first
      const uploadedDocument = await uploadDocument(complaintDocument);
      // Add the uploaded document ID to the ACF data
    //   setShowComplaint(true);
      acfData.toggle_complaint = true;
      acfData.complaint_document = uploadedDocument.id;
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadStatus('Error uploading document.');
      return;
    }
  }

// Conditionally add stock_shortcode

    acfData.stock_shortcode = generateStockShortcode();

    const folderId = folderSelection === 'cases' ? 11 : 
                   folderSelection === 'investigations' ? 13 : 
                   null;

// Construct pageData with the acf object
const pageData = {
    title: ticker,
    content: fullContent,
    status: 'publish',
    template: 'template-class-action.php',
    menu_order: -1,
    acf: acfData,
    wf_page_folders: [folderId],
};

  try {
    const response = await axios.post(apiEndpoint, pageData, { headers });
    console.log('Page created:', response.data);
    setUploadStatus('Page uploaded successfully!');
  } catch (error) {
    console.error('Error creating page:', error);
    setUploadStatus('Error uploading page.');
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
      return response.data;  // Return the uploaded document details
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

const handleFileChange = (e) => {
    setComplaintDocument(e.target.files[0]);
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
                {generatedContentWord && (
                    <>
                        <textarea value={generatedContentWord} readOnly className="output-box" />
                        <button onClick={() => downloadDocument(generatedContentWord)}>Download Word Document</button>
                    </>
                )}
            </>
        ),
    },
    {
        label: 'Site Version',
        key: 'site',
        children: (
            <>
                {generatedContentSite && (
                    <>
                        <textarea value={generatedContentSite} readOnly className="output-box" />

                        {/* Additional questions for Site Version */}
                        <div className="form-section">
                            {/* <label>
                                Show Certification Form:
                                <input
                                    type="checkbox"
                                    checked={showCertification}
                                    onChange={() => setShowCertification(!showCertification)}
                                />
                            </label>
                            <label>
                                Show Stock Information:
                                <input
                                    type="checkbox"
                                    checked={showStock}
                                    onChange={() => setShowStock(!showStock)}
                                />
                            </label> */}
                             <label>
                                Select Folder:
                                <select value={folderSelection} onChange={e => setFolderSelection(e.target.value)}>
                                    <option value="" disabled>Select Folder</option>
                                    <option value="cases">Cases</option>
                                    <option value="investigations">Investigations</option>
                                </select>
                            </label>
                            {/* File input for uploading complaint document */}
                            <label>
                                Upload Complaint Document:
                                <input
                                    type="file"
                                    onChange={handleFileChange} // Function to handle file selection
                                />
                            </label>
                        </div>

                        <button onClick={handleUploadToSite}>Upload to Site</button>
                        {uploadStatus && <p className="status-message">{uploadStatus}</p>}
                    </>
                )}
            </>
        ),
    },
    // Add more tabs here if needed
];




return (
    <div className="app">
        <header>
            <h1>Company Details Form</h1>
        </header>

        <main>
            <input
                type="text"
                placeholder="Enter full company name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter short company name"
                value={shortName}
                onChange={e => setShortName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter ticker"
                value={ticker}
                onChange={e => setTicker(e.target.value)}
            />

<div>
                    <span>Choose stock market exchange:</span>
                    <select value={showCustomInput ? "Other" : exchange} onChange={handleExchangeChange}>
                        <option value="" disabled hidden>Select an exchange</option>
                        {exchanges.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {showCustomInput && (
                        <input 
                            type="text" 
                            placeholder="Enter custom exchange" 
                            value={exchange}
                            onChange={e => setExchange(e.target.value)}
                            required
                        />
                    )}
                </div>

            <div>
                <span>What type of case is it?</span>
                <select value={caseType} onChange={e => setCaseType(e.target.value)}>
                    <option value="" disabled hidden>Select a case type</option>
                    {cases.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {caseType === 'IPO' && (
                <>
                    <label>
                        IPO Date:
                        <input
                            type="date"
                            placeholder="Enter IPO Date"
                            value={ipoDate}
                            onChange={e => setIpoDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Lead Plaintiff Deadline:
                        <input
                            type="date"
                            placeholder="Enter Lead Plaintiff Deadline"
                            value={leadPlaintiffDeadline}
                            onChange={e => setLeadPlaintiffDeadline(e.target.value)}
                        />
                    </label>

                    <label>
                        Case Details:
                        <textarea
                            placeholder="Enter Case Details"
                            value={caseDetails}
                            onChange={e => setCaseDetails(e.target.value)}
                        />
                    </label>
                </>
            )}

            {caseType === 'Class period and IPO' && (
                <div>
                    <label>
                        IPO Date:
                        <input
                            type="date"
                            value={ipoDate}
                            onChange={e => setIpoDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Class Period Start Date:
                        <input
                            type="date"
                            value={classPeriodStartDate}
                            onChange={e => setClassPeriodStartDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Class Period End Date:
                        <input
                            type="date"
                            value={classPeriodEndDate}
                            onChange={e => setClassPeriodEndDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Lead Plaintiff Deadline:
                        <input
                            type="date"
                            value={leadPlaintiffDeadline}
                            onChange={e => setLeadPlaintiffDeadline(e.target.value)}
                        />
                    </label>

                    <label>
                        Complaint Allegations:
                        <textarea
                            value={caseDetails}
                            onChange={e => setCaseDetails(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {caseType === 'Class period' && (
                <div>
                    <label>
                        Enter Lead Plaintiff Deadline:
                        <input
                            type="date"
                            value={leadPlaintiffDeadline}
                            onChange={e => setLeadPlaintiffDeadline(e.target.value)}
                        />
                    </label>
                    <label>
                        Enter Class Period Start Date:
                        <input
                            type="date"
                            value={classPeriodStartDate}
                            onChange={e => setClassPeriodStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Enter Class Period End Date:
                        <input
                            type="date"
                            value={classPeriodEndDate}
                            onChange={e => setClassPeriodEndDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Enter Case Details:
                        <textarea
                            value={caseDetails}
                            onChange={e => setCaseDetails(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {caseType === '10b investigation' && (
                <label>
                    Investigation Details:
                    <textarea
                        placeholder="Enter paragraph of investigation"
                        value={investigationParagraph}
                        onChange={e => setInvestigationParagraph(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </label>
            )}

            {caseType === 'Derivative investigation' && (
                <div>
                    <label>
                        Date of Purchase:
                        <input
                            type="date"
                            value={purchaseDate}
                            onChange={e => setPurchaseDate(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {caseType === 'SPAC investigation' && (
                <div>
                    <label>
                        SPAC Full Name:
                        <input
                            type="text"
                            placeholder="Enter SPAC Full Name"
                            value={spacFullName}
                            onChange={e => setSpacFullName(e.target.value)}
                        />
                    </label>

                    <label>
                        SPAC Short Name:
                        <input
                            type="text"
                            placeholder="Enter SPAC Short Name"
                            value={spacShortName}
                            onChange={e => setSpacShortName(e.target.value)}
                        />
                    </label>

                    <label>
                        Merger Date:
                        <input
                            type="date"
                            value={mergerDate}
                            onChange={e => setMergerDate(e.target.value)}
                        />
                    </label>
                </div>
            )}

            <button onClick={handleSubmit}>Submit</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {(generatedContentWord || generatedContentSite) && (
                <Tabs items={tabs} defaultActiveKey="newswire" />
                // <Tabs defaultActiveKey="newswire">
                //     <TabPane tab="Newswire Version" key="newswire">
                //         {generatedContentWord && (
                //             <>
                //                 <textarea value={generatedContentWord} readOnly className="output-box" />
                //                 <button onClick={() => downloadDocument(generatedContentWord)}>Download Word Document</button>
                //             </>
                //         )}
                //     </TabPane>
                //     <TabPane tab="Site Version" key="site">
                //     {generatedContentSite && (
                //         <>
                //             <textarea value={generatedContentSite} readOnly className="output-box" />
                            
                //             {/* Additional questions for Site Version */}
                //             <div className="form-section">
                //                 {/* <label>
                //                     Show Countdown:
                //                     <input
                //                         type="checkbox"
                //                         checked={showCountdown}
                //                         onChange={() => setShowCountdown(!showCountdown)}
                //                     />
                //                 </label> */}
                //                 {/* <label>
                //                     Show Complaint:
                //                     <input
                //                         type="checkbox"
                //                         checked={showComplaint}
                //                         onChange={() => setShowComplaint(!showComplaint)}
                //                     />
                //                 </label> */}
                //                 <label>
                //                     Show Certification Form:
                //                     <input
                //                         type="checkbox"
                //                         checked={showCertification}
                //                         onChange={() => setShowCertification(!showCertification)}
                //                     />
                //                 </label>
                //                 <label>
                //                     Show Stock Information:
                //                     <input
                //                         type="checkbox"
                //                         checked={showStock}
                //                         onChange={() => setShowStock(!showStock)}
                //                     />
                //                 </label>

                //                 {/* File input for uploading complaint document */}
      
                // <label>
                //     Upload Complaint Document:
                //     <input
                //         type="file"
                //         onChange={handleFileChange} // Function to handle file selection
                //     />
                // </label>
    
                //             </div>

                //             <button onClick={handleUploadToSite}>Upload to Site</button>
                //             {uploadStatus && <p className="status-message">{uploadStatus}</p>}
                //         </>
                //     )}
                // </TabPane>


                // </Tabs>
            )}
        </main>
    </div>
);
}
export default App;

