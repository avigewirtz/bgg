import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun, ExternalHyperlink} from 'docx';
import './App.css';

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
    const [spacShortName, setSpacShortName] = useState('');
    const [mergerDate, setMergerDate] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    const exchanges = ['NYSE', 'NASDAQ', 'OTCMKTS', 'Other'];
    const [exchange, setExchange] = useState("");

    const cases = ['Class period', 'IPO', 'Class period and IPO', '10b investigation', 'Derivative investigation', 'SPAC investigation'];

    const handleSubmit = () => {
        if (!fullName || !shortName || !ticker || !exchange || !caseType) {
            setErrorMessage('Please fill in all fields and make your choices.');
            return;
        }

        if (caseType === 'SPAC investigation') {
            const generatedRelease = generate_spac_investigation(fullName, shortName, exchange, ticker, spacFullName, spacShortName, mergerDate);
            setGeneratedContent(generatedRelease);

        }
        if (caseType === '10b investigation') {
            const generatedRelease = generate_10b_investigation(fullName, shortName, exchange, ticker, investigationParagraph);
            setGeneratedContent(generatedRelease);
        }

        if (caseType === 'Derivative investigation') {
            const generatedRelease = generate_derivative_investigation(fullName, ticker, shortName, exchange, purchaseDate);
            setGeneratedContent(generatedRelease);
        }
        if (caseType === 'Class period and IPO') {
            const generatedRelease = generate_class_period_and_ipo(
                fullName, ticker, shortName, exchange,
                ipoDate, classPeriodStartDate, classPeriodEndDate,
                caseDetails, leadPlaintiffDeadline
            );
            setGeneratedContent(generatedRelease);
        }
       if (caseType === 'IPO') {
           const generatedRelease = generate_ipo(
               fullName, ticker, shortName, exchange,
               ipoDate, caseDetails, leadPlaintiffDeadline
           );
           setGeneratedContent(generatedRelease);
       }

       if (caseType === 'Class period') {
           const generatedRelease = generate_class_period(
               fullName, ticker, shortName, exchange,
               classPeriodStartDate, classPeriodEndDate, caseDetails,
               leadPlaintiffDeadline
           );
           setGeneratedContent(generatedRelease);
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
    
 function formatDate(inputDate) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [year, month, day] = inputDate.split('-');
    const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
    
    return formattedDate;
}

const generate_ipo = (
    full_name, ticker, short_name, exchange,
    ipo_date, case_details, lead_plaintiff_deadline
) => {
    const formattedIpoDate = formatDate(ipo_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);

    return (
`${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${fullName} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.

Class Definition:
This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIpoDate} initial public offering ("IPO"). Such investors are encouraged to join this case by visiting the firm’s site: bgandg.com/${ticker}.

Case Details:
${case_details}

What’s Next?
A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: bgandg.com/${ticker} or you may contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC at 332-239-2660. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
    );
};




const generate_class_period = (
    full_name, ticker, short_name, exchange,
    class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    
    return (
`${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${fullName} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.

Class Definition:
This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities between ${formattedClassPeriodStartDate} and ${formattedClassPeriodEndDate}, inclusive (the “Class Period”). Such investors are encouraged to join this case by visiting the firm’s site: bgandg.com/${ticker}.

Case Details:
${case_details}

What’s Next?
A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: bgandg.com/${ticker} or you may contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC at 332-239-2660. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
    );
};

const generate_class_period_and_ipo = (
    full_name, ticker, short_name, exchange,
    ipo_date, class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    const formattedIPODate = formatDate(ipo_date);
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    
     return (
`${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${fullName} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.

Class Definition:
This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities: (1) pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIPODate} initial public offering ("IPO"); or (ii) between ${formattedClassPeriodStartDate} and ${formattedClassPeriodEndDate}, both dates inclusive (the “Class Period”). Such investors are encouraged to join this case by visiting the firm’s site: bgandg.com/${ticker}.

Case Details:
${case_details}

What’s Next?
A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: bgandg.com/${ticker} or you may contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC at 332-239-2660. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
     );
 };



 const generate_derivative_investigation = (full_name, ticker, short_name, exchange, purchaseDate) => {
    const formattedPurchaseDate = formatDate(purchaseDate);
    
     return (
`Bronstein, Gewirtz & Grossman, LLC Notifies Shareholders of ${full_name} (${ticker}) Investigation

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities prior to ${formattedPurchaseDate}, and continue to hold to the present, are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: bgandg.com/${ticker}.

Investigation Details:
The investigation concerns whether ${short_name} and certain of its officers and/or directors have engaged in corporate wrongdoing.

What’s Next?
If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation by visiting the firm’s site: bgandg.com/${ticker}. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: 332-239-2660.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
     );
 };



  const generate_spac_investigation = (full_name, short_name, exchange, ticker, spac_full_name, spac_short_name, merger_date) => {
    const formattedMergerDate = formatDate(merger_date);
      return (
`Calling All ${full_name} (${ticker}) Investors: Contact Bronstein, Gewirtz & Grossman, LLC To Claim Your Losses

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${spac_full_name} (“${spac_short_name}”), which merged with ${full_name} (“${short_name}”) (${exchange}: ${ticker}) on ${formattedMergerDate}. Investors who purchased ${spac_short_name} and continue to hold to the present, are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: bgandg.com/${ticker}.

Investigation Details:
The investigation concerns whether ${spac_short_name} failed to provide relevant information to its shareholders before the merger.

What’s Next?
If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation by visiting the firm’s site: bgandg.com/${ticker}. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: 332-239-2660.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits.  Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
      );
  };


const generate_10b_investigation = (full_name, short_name, exchange, ticker, investigation_paragraph) => {
    return (
        `${full_name} (${ticker}) Investigation: Bronstein, Gewirtz & Grossman, LLC Encourages Investors to Seek Compensation for Alleged Wrongdoings

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: bgandg.com/${ticker}.

The investigation concerns whether ${short_name} has violated federal securities laws.

Investigation Details:
${investigation_paragraph}

What’s Next?
If you are aware of any facts relating to this investigation or purchased ${short_name} securities, you can assist this investigation by visiting the firm’s site: bgandg.com/${ticker}. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: 332-239-2660.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits.  Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
    );
};


const downloadDocument = (content) => {
    const paragraphs = contentToParagraphs(content);


    if (paragraphs.length === 0) return;

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: paragraphs
            },
        ],
    });

   try {
       Packer.toBlob(doc)
           .then(blob => {
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url;
               a.download = 'document.docx';
               a.click();
           });
   } catch (e) {
       console.error("Detailed error:", e);
   }
};

const contentToParagraphs = (content) => {
    if (!content || typeof content !== 'string') return [];

    const boldKeywords = [
        "Investigation Details:",
        "What’s Next?",
        "Why Bronstein, Gewirtz & Grossman:",
        "Contact",
        "Case Details:",
        "Class Definition:"
    ];

    const lines = content.split('\n');
    let isFirstParagraph = true; // For tracking the first paragraph

    return lines.map((line, index) => {
        let isBold = isFirstParagraph || boldKeywords.some(keyword => line.startsWith(keyword));

        if (isFirstParagraph && index > 0) { // Reset flag after processing the first paragraph
            isFirstParagraph = false;
        }

        const processLink = (part, linkType) => {
            const isEmail = linkType === "email";
            const formattedLink = isEmail ? part : part.toLowerCase();
            const link = isEmail ? `mailto:${formattedLink}` : `https://${formattedLink}`;
            return new ExternalHyperlink({
                children: [
                    new TextRun({
                        text: formattedLink,
                        style: "Hyperlink",
                        bold: isBold
                    })
                ],
                link: link
            });
        };

        if (line.includes('bgandg.com/') || line.includes('info@bgandg.com')) {
            const regex = /(bgandg\.com\/\S+?)(?=[.,;]?(\s|$)|info@bgandg\.com)/g;
            const parts = line.split(regex);
            const runs = parts.map(part => {
                if (part.includes('bgandg.com/')) {
                    return processLink(part, "url");
                } else if (part.includes('info@bgandg.com')) {
                    return processLink(part, "email");
                } else {
                    return new TextRun({
                        text: part,
                        bold: isBold
                    });
                }
            });
            return new Paragraph({ children: runs });
        } else {
            return new Paragraph({
                children: [new TextRun({
                    text: line,
                    bold: isBold
                })]
            });
        }
    });
};


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

            {generatedContent && (
                <>
                    <textarea
                        value={generatedContent}
                        readOnly
                        className="output-box"
                    />
                    <button onClick={() => downloadDocument(generatedContent)}>Download Word Document</button>
                </>
            )}
        </main>
    </div>
);
}
export default App;

