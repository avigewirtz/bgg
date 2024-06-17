

function formatDate(momentDate) {
    if (!momentDate) {
        return '';
    }
    // Use Moment.js formatting to get the desired output
    return momentDate.format('MMMM D, YYYY');
}



export const generate_ipo_site = (
    full_name, ticker, short_name, exchange,
    ipo_date, case_details, lead_plaintiff_deadline
) => {
    const formattedIpoDate = formatDate(ipo_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);

    const formatCaseDetails = (case_details) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = case_details.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_case_details = formatCaseDetails(case_details);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

       <h3>Class Definition</h3>
        <p> This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIpoDate} initial public offering ("IPO"). Such investors are encouraged to join this case.</p>

        <h3>Case Details</h3>
        ${formatted_case_details}

        <h3>What's Next?</h3>
        <p> A class action lawsuit has already been filed. You may review a copy of the Complaint. You may also contact Peretz Bronstein, Esq. or his Client Relations Manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as lead plaintiff.</p>

        <h3>There is No Cost to You</h3>
        <p>We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        </body>
        </html>`
    );
};


export const generate_class_period_site = (
    full_name, ticker, short_name, exchange,
    class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    
    const formatCaseDetails = (case_details) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = case_details.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_case_details = formatCaseDetails(case_details);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <h3>Class Definition</h3>
        <p> This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities between ${formattedClassPeriodStartDate}, and ${formattedClassPeriodEndDate}, inclusive (the “Class Period”). Such investors are encouraged to join this case.</p>

        <h3>Case Details</h3>
        ${formatted_case_details}

        <h3>What's Next?</h3>
        <p> A class action lawsuit has already been filed. You may review a copy of the Complaint. You may also contact Peretz Bronstein, Esq. or his Client Relations Manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as lead plaintiff.</p>

        <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        </body>
        </html>`
    );
};


export const generate_class_period_and_ipo_site = (
    full_name, ticker, short_name, exchange,
    ipo_date, class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    const formattedIPODate = formatDate(ipo_date);
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    const formatCaseDetails = (case_details) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = case_details.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_case_details = formatCaseDetails(case_details);
    
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

       <h3>Class Definition</h3>
        <p> This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities: (1) pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIPODate} initial public offering ("IPO"); or (ii) between ${formattedClassPeriodStartDate}, and ${formattedClassPeriodEndDate}, both dates inclusive (the “Class Period”). Such investors are encouraged to join this case.</p>

        <h3>Case Details</h3>
        ${formatted_case_details}

        <h3>What's Next?</h3>
        <p> A class action lawsuit has already been filed. You may review a copy of the Complaint. You may also contact Peretz Bronstein, Esq. or his Client Relations Manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as lead plaintiff.</p>

       <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        </body>
        </html>`
    );
};



export const generate_derivative_investigation_site = (full_name, ticker, short_name, exchange, purchaseDate) => {
    const formattedPurchaseDate = formatDate(purchaseDate);
    
    
    return (
        ` <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities prior to ${formattedPurchaseDate}, and continue to hold to the present, are encouraged to obtain additional information and assist the investigation.</p>

        <h3>Investigation Details</h3>
        <p> The investigation concerns whether ${short_name} and certain of its officers and/or directors have engaged in corporate wrongdoing.</p>

        <h3>What's Next?</h3>
        <p> If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation. You can also contact Peretz Bronstein or his client relations manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>.</p>

       <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        </body>
</html>`

    );
};




 export const generate_spac_investigation_site = (full_name, short_name, exchange, ticker, spac_full_name, spac_short_name, merger_date) => {
    const formattedMergerDate = formatDate(merger_date);
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${spac_full_name} (“${spac_short_name}”), which merged with ${full_name} (“${short_name}”) (${exchange}: ${ticker}) on ${formattedMergerDate}. Investors who purchased ${spac_short_name} and continue to hold to the present, are encouraged to obtain additional information and assist the investigation.</p>

        <h3>Investigation Details</h3>
        <p> The investigation concerns whether ${spac_short_name} failed to provide relevant information to its shareholders before the merger.</p>

        <h3>What's Next?</h3>
        <p> If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation. You can also contact Peretz Bronstein or his client relations manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>.</p>

       <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        </body>
        </html>`
    );
};



export const generate_10b_investigation_site = (full_name, short_name, exchange, ticker, investigation_paragraph) => {

    const formatInvestigationParagraph = (investigation_paragraph) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = investigation_paragraph.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_investigation_paragraph = formatInvestigationParagraph(investigation_paragraph);

    
    // console.log("IP = " + investigation_paragraph);
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p>Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities are encouraged to obtain additional information and assist the investigation.</p>

        <p>The investigation concerns whether ${short_name} has violated federal securities laws.</p>

        <h3>Investigation Details</h3>
        ${formatted_investigation_paragraph}

        <h3>What's Next?</h3>
        <p> If you are aware of any facts relating to this investigation or purchased ${short_name} securities, you can assist this investigation. You can also contact Peretz Bronstein or his client relations manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>.</p>

       <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>
              
        </body>
        </html>`
    );
};





















export const generate_ipo_html = (
    full_name, ticker, short_name, exchange,
    ipo_date, case_details, lead_plaintiff_deadline
) => {
    const formattedIpoDate = formatDate(ipo_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    const formatCaseDetails = (case_details) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = case_details.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_case_details = formatCaseDetails(case_details);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p><strong>${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${full_name} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!</strong></p>

        <p>Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <h3>Class Definition</h3>
        <p> This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIpoDate} initial public offering ("IPO"). Such investors are encouraged to join this case by visiting the firm’s site: <a href="https://bgandg.com/${ticker}">bgandg.com/${ticker}</a>.</p>

        <h3>Case Details</h3>
        ${formatted_case_details}

        <h3>What's Next?</h3>
        <p> A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: <a href="https://bgandg.com/${ticker}">bgandg.com/${ticker}</a> or you may contact Peretz Bronstein, Esq. or his Client Relations Manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC at <a href="tel:332-239-2660">332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as lead plaintiff.</p>

        <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <h3>Contact</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Nathan Miller<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>
        </body>
        </html>`
    );
};




export const generate_class_period_html = (
    full_name, ticker, short_name, exchange,
    class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);

    const formatCaseDetails = (case_details) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = case_details.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_case_details = formatCaseDetails(case_details);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p><strong>${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${full_name} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!</strong></p>

        <p>Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC, a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <h3>Class Definition</h3>
        <p> This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities between ${formattedClassPeriodStartDate}, and ${formattedClassPeriodEndDate}, inclusive (the “Class Period”). Such investors are encouraged to join this case by visiting the firm’s site: <a href="https://bgandg.com/${ticker}">bgandg.com/${ticker}</a>.</p>

        <h3>Case Details</h3>
        ${formatted_case_details}

        <h3>What's Next?</h3>
        <p> A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: <a href="https://bgandg.com/${ticker}">bgandg.com/${ticker}</a> or you may contact Peretz Bronstein, Esq. or his Client Relations Manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC at <a href="tel:332-239-2660">332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as lead plaintiff.</p>

        <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <h3>Contact</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Nathan Miller<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>
        </body>
        </html>`
    );
};

export const generate_class_period_and_ipo_html = (
    full_name, ticker, short_name, exchange,
    ipo_date, class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    const formattedIPODate = formatDate(ipo_date);
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);

    const formatCaseDetails = (case_details) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = case_details.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_case_details = formatCaseDetails(case_details);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p><strong>${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${full_name} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!</strong></p>

        <p>Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC, a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <h3>Class Definition</h3>
        <p> This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities: (1) pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIPODate} initial public offering ("IPO"); or (ii) between ${formattedClassPeriodStartDate}, and ${formattedClassPeriodEndDate}, both dates inclusive (the “Class Period”). Such investors are encouraged to join this case by visiting the firm’s site: <a href="https://bgandg.com/${ticker}">bgandg.com/${ticker}</a>.</p>

        <h3>Case Details</h3>
        ${formatted_case_details}

        <h3>What's Next?</h3>
        <p> A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: <a href="https://bgandg.com/${ticker}">bgandg.com/${ticker}</a> or you may contact Peretz Bronstein, Esq. or his Client Relations Manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC at <a href="tel:332-239-2660">332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as lead plaintiff.</p>

        <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <h3>Contact</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Nathan Miller<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>
        </body>
        </html>`
    );
};

export const generate_derivative_investigation_html = (full_name, ticker, short_name, exchange, purchaseDate) => {
    const formattedPurchaseDate = formatDate(purchaseDate);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p><strong>Bronstein, Gewirtz & Grossman, LLC Notifies Shareholders of ${full_name} (${ticker}) Investigation</strong></p>

        <p>Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities prior to ${formattedPurchaseDate}, and continue to hold to the present, are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: <a href="bgandg.com/${ticker}">bgandg.com/${ticker}</a>.</p>

       <h3>Investigation Details</h3>
        <p> The investigation concerns whether ${short_name} and certain of its officers and/or directors have engaged in corporate wrongdoing.</p>

        <h3>What's Next?</h3>
        <p> If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation by visiting the firm’s site: <a href="bgandg.com/${ticker}">bgandg.com/${ticker}</a>. You can also contact Peretz Bronstein or his client relations manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660">332-239-2660</a>.</p>

        <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <h3>Contact</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Nathan Miller<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>
        </body>
        </html>`
    );
};

export const generate_spac_investigation_html = (full_name, short_name, exchange, ticker, spac_full_name, spac_short_name, merger_date) => {
    const formattedMergerDate = formatDate(merger_date);

    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p><strong>Calling All ${full_name} (${ticker}) Investors: Contact Bronstein, Gewirtz & Grossman, LLC To Claim Your Losses</strong></p>

        <p>Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${spac_full_name} (“${spac_short_name}”), which merged with ${full_name} (“${short_name}”) (${exchange}: ${ticker}) on ${formattedMergerDate}. Investors who purchased ${spac_short_name} and continue to hold to the present, are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: <a href="bgandg.com/${ticker}">bgandg.com/${ticker}</a>.</p>

       <h3>Investigation Details</h3>
        <p> The investigation concerns whether ${spac_short_name} failed to provide relevant information to its shareholders before the merger.</p>

        <h3>What's Next?</h3>
        <p> If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation by visiting the firm’s site: <a href="bgandg.com/${ticker}">bgandg.com/${ticker}</a>. You can also contact Peretz Bronstein or his client relations manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660">332-239-2660</a>.</p>

        <h3>There is No Cost to You</h3>
        <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <h3>Contact</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Nathan Miller<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>
        </body>
        </html>`
    );
};



export const generate_10b_investigation_html = (full_name, short_name, exchange, ticker, investigation_paragraph) => {

    const formatInvestigationParagraph = (investigation_paragraph) => {
        // Split the text into paragraphs based on line breaks
        const paragraphs = investigation_paragraph.split('\n').filter(p => p.trim() !== '');
    
        // Wrap each paragraph in <p> tags
        const formattedParagraphs = paragraphs.map(p => `<p>${p}</p>`);
    
        // Join the paragraphs back into a single string
        return formattedParagraphs.join('\n');
    };
    

    
    const formatted_investigation_paragraph = formatInvestigationParagraph(investigation_paragraph);
    // console.log("IP = " + investigation_paragraph);
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        </head>
        <body>
        <p><strong>${full_name} (${ticker}) Investigation: Bronstein, Gewirtz & Grossman, LLC Encourages Investors to Seek Compensation for Alleged Wrongdoings</strong></p>

        <p>Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: <a href="bgandg.com/${ticker}">bgandg.com/${ticker}</a>.</p>

       <h3>Investigation Details</h3>
        ${formatted_investigation_paragraph}

        <h3>What's Next?</h3>
        <p> If you are aware of any facts relating to this investigation or purchased ${short_name} securities, you can assist this investigation by visiting the firm’s site: <a href="bgandg.com/${ticker}">bgandg.com/${ticker}</a>. You can also contact Peretz Bronstein or his client relations manager, Nathan Miller, of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660">332-239-2660</a>.</p>

       <p> <h3>There is No Cost to You</h3>
       <p> We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <h3>Why Bronstein, Gewirtz & Grossman</h3>
        <p>Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <h3>Contact</h3>
        <p> Bronstein, Gewirtz & Grossman, LLC<br>
        Peretz Bronstein or Nathan Miller<br>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>
        </body>
        </html>`
    );
};














