function formatDate(inputDate) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [year, month, day] = inputDate.split('-');
    const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
    
    return formattedDate;
}



export const generate_ipo = (
    full_name, ticker, short_name, exchange,
    ipo_date, case_details, lead_plaintiff_deadline
) => {
    const formattedIpoDate = formatDate(ipo_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);

    return (
`${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${full_name} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.

Class Definition:
This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIpoDate} initial public offering ("IPO"). Such investors are encouraged to join this case by visiting the firm’s site: bgandg.com/${ticker}.

Case Details:
${case_details}

What’s Next?
A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: bgandg.com/${ticker} or you may contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC at 332-239-2660. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.

There is No Cost to You
We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
    );
};




export const generate_class_period = (
    full_name, ticker, short_name, exchange,
    class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    
    return (
`${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${full_name} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.

Class Definition:
This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities between ${formattedClassPeriodStartDate} and ${formattedClassPeriodEndDate}, inclusive (the “Class Period”). Such investors are encouraged to join this case by visiting the firm’s site: bgandg.com/${ticker}.

Case Details:
${case_details}

What’s Next?
A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: bgandg.com/${ticker} or you may contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC at 332-239-2660. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.

There is No Cost to You
We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
    );
};

export const generate_class_period_and_ipo = (
    full_name, ticker, short_name, exchange,
    ipo_date, class_period_start_date, class_period_end_date,
    case_details, lead_plaintiff_deadline
) => {
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);
    const formattedIPODate = formatDate(ipo_date);
    const formattedClassPeriodStartDate = formatDate(class_period_start_date);
    const formattedClassPeriodEndDate = formatDate(class_period_end_date);
    
     return (
`${ticker} INVESTOR ALERT: Bronstein, Gewirtz & Grossman LLC Announces that ${full_name} Investors with Substantial Losses Have Opportunity to Lead Class Action Lawsuit!

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.

Class Definition:
This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities: (1) pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIPODate} initial public offering ("IPO"); or (ii) between ${formattedClassPeriodStartDate} and ${formattedClassPeriodEndDate}, both dates inclusive (the “Class Period”). Such investors are encouraged to join this case by visiting the firm’s site: bgandg.com/${ticker}.

Case Details:
${case_details}

What’s Next?
A class action lawsuit has already been filed. If you wish to review a copy of the Complaint, you can visit the firm’s site: bgandg.com/${ticker} or you may contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC at 332-239-2660. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.

There is No Cost to You
We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
     );
 };



 export const generate_derivative_investigation = (full_name, ticker, short_name, exchange, purchaseDate) => {
    const formattedPurchaseDate = formatDate(purchaseDate);
    
     return (
`Bronstein, Gewirtz & Grossman, LLC Notifies Shareholders of ${full_name} (${ticker}) Investigation

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities prior to ${formattedPurchaseDate}, and continue to hold to the present, are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: bgandg.com/${ticker}.

Investigation Details:
The investigation concerns whether ${short_name} and certain of its officers and/or directors have engaged in corporate wrongdoing.

What’s Next?
If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation by visiting the firm’s site: bgandg.com/${ticker}. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: 332-239-2660.

There is No Cost to You
We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
     );
 };



export const generate_spac_investigation = (full_name, short_name, exchange, ticker, spac_full_name, spac_short_name, merger_date) => {
    const formattedMergerDate = formatDate(merger_date);
      return (
`Calling All ${full_name} (${ticker}) Investors: Contact Bronstein, Gewirtz & Grossman, LLC To Claim Your Losses

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${spac_full_name} (“${spac_short_name}”), which merged with ${full_name} (“${short_name}”) (${exchange}: ${ticker}) on ${formattedMergerDate}. Investors who purchased ${spac_short_name} and continue to hold to the present, are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: bgandg.com/${ticker}.

Investigation Details:
The investigation concerns whether ${spac_short_name} failed to provide relevant information to its shareholders before the merger.

What’s Next?
If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation by visiting the firm’s site: bgandg.com/${ticker}. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: 332-239-2660.

There is No Cost to You
We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits.  Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
      );
  };


export const generate_10b_investigation = (full_name, short_name, exchange, ticker, investigation_paragraph) => {
    return (
        `${full_name} (${ticker}) Investigation: Bronstein, Gewirtz & Grossman, LLC Encourages Investors to Seek Compensation for Alleged Wrongdoings

Attorney Advertising-- NEW YORK--(PR NEWSWIRE)--Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities are encouraged to obtain additional information and assist the investigation by visiting the firm’s site: bgandg.com/${ticker}.

The investigation concerns whether ${short_name} has violated federal securities laws.

Investigation Details:
${investigation_paragraph}

What’s Next?
If you are aware of any facts relating to this investigation or purchased ${short_name} securities, you can assist this investigation by visiting the firm’s site: bgandg.com/${ticker}. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: 332-239-2660.

There is No Cost to You
We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.

Why Bronstein, Gewirtz & Grossman:
Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits.  Our firm has recovered hundreds of millions of dollars for investors nationwide.

Attorney advertising. Prior results do not guarantee similar outcomes.

Contact:
Bronstein, Gewirtz & Grossman, LLC
Peretz Bronstein or Yael Nathanson
332-239-2660 | info@bgandg.com`
    );
};






export const generate_ipo_site = (
    full_name, ticker, short_name, exchange,
    ipo_date, case_details, lead_plaintiff_deadline
) => {
    const formattedIpoDate = formatDate(ipo_date);
    const formattedLeadPlaintiffDeadline = formatDate(lead_plaintiff_deadline);

    return (
        `<strong>${ticker} ${full_name}</strong>

        <p>Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <p><strong>Class Definition:</strong><br/>
        This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIpoDate} initial public offering ("IPO"). Such investors are encouraged to join this case.</p>

        <p><strong>Case Details:</strong><br/>
        ${case_details}</p>

        <p><strong>What’s Next?</strong><br/>
        A class action lawsuit has already been filed. You may review a copy of the Complaint. You may also contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.</p>

        <p><strong>There is No Cost to You</strong><br/>
        We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <p><strong>Why Bronstein, Gewirtz & Grossman:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <p><strong>Contact:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Yael Nathanson<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>`
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
    
    return (
        `<strong>${ticker} ${full_name}</strong>

        <p>Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <p><strong>Class Definition:</strong><br/>
        This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities between ${formattedClassPeriodStartDate} and ${formattedClassPeriodEndDate}, inclusive (the “Class Period”). Such investors are encouraged to join this case.</p>

        <p><strong>Case Details:</strong><br/>
        ${case_details}</p>

        <p><strong>What’s Next?</strong><br/>
        A class action lawsuit has already been filed. You may review a copy of the Complaint. You may also contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.</p>

        <p><strong>There is No Cost to You</strong><br/>
        We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <p><strong>Why Bronstein, Gewirtz & Grossman:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <p><strong>Contact:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Yael Nathanson<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>`
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
    
    return (
        `<strong>${ticker} ${full_name}</strong>

        <p>Bronstein, Gewirtz & Grossman, LLC a nationally recognized law firm, notifies investors that a class action lawsuit has been filed against ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}) and certain of its officers.</p>

        <p><strong>Class Definition:</strong><br/>
        This lawsuit seeks to recover damages against Defendants for alleged violations of the federal securities laws on behalf of all persons and entities that purchased or otherwise acquired ${short_name} securities: (1) pursuant to the registration statement and prospectus issued in connection with the Company's ${formattedIPODate} initial public offering ("IPO"); or (ii) between ${formattedClassPeriodStartDate} and ${formattedClassPeriodEndDate}, both dates inclusive (the “Class Period”). Such investors are encouraged to join this case.</p>

        <p><strong>Case Details:</strong><br/>
        ${case_details}</p>

        <p><strong>What’s Next?</strong><br/>
        A class action lawsuit has already been filed. You may review a copy of the Complaint. You may also contact Peretz Bronstein, Esq. or his Law Clerk and Client Relations Manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>. If you suffered a loss in ${short_name} you have until ${formattedLeadPlaintiffDeadline}, to request that the Court appoint you as lead plaintiff. Your ability to share in any recovery doesn't require that you serve as a lead plaintiff.</p>

        <p><strong>There is No Cost to You</strong><br/>
        We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <p><strong>Why Bronstein, Gewirtz & Grossman:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <p><strong>Contact:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Yael Nathanson<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>`
    );
};



export const generate_derivative_investigation_site = (full_name, ticker, short_name, exchange, purchaseDate) => {
    const formattedPurchaseDate = formatDate(purchaseDate);
    
    return (
        `<p>Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities prior to ${formattedPurchaseDate}, and continue to hold to the present, are encouraged to obtain additional information and assist the investigation.</p>

        <p><strong>Investigation Details:</strong><br/>
        The investigation concerns whether ${short_name} and certain of its officers and/or directors have engaged in corporate wrongdoing.</p>

        <p><strong>What’s Next?</strong><br/>
        If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>.</p>

        <p><strong>There is No Cost to You</strong><br/>
        We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <p><strong>Why Bronstein, Gewirtz & Grossman:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <p><strong>Contact:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Yael Nathanson<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>`
    );
};




 export const generate_spac_investigation_site = (full_name, short_name, exchange, ticker, spac_full_name, spac_short_name, merger_date) => {
    const formattedMergerDate = formatDate(merger_date);
    return (
        `<p>Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${spac_full_name} (“${spac_short_name}”), which merged with ${full_name} (“${short_name}”) (${exchange}: ${ticker}) on ${formattedMergerDate}. Investors who purchased ${spac_short_name} and continue to hold to the present, are encouraged to obtain additional information and assist the investigation.</p>

        <p><strong>Investigation Details:</strong><br/>
        The investigation concerns whether ${spac_short_name} failed to provide relevant information to its shareholders before the merger.</p>

        <p><strong>What’s Next?</strong><br/>
        If you are aware of any facts relating to this investigation or purchased ${short_name} shares, you can assist this investigation. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>.</p>

        <p><strong>There is No Cost to You</strong><br/>
        We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <p><strong>Why Bronstein, Gewirtz & Grossman:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <p><strong>Contact:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Yael Nathanson<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>`
    );
};



export const generate_10b_investigation_site = (full_name, short_name, exchange, ticker, investigation_paragraph) => {
    return (
        `<p>Bronstein, Gewirtz & Grossman, LLC is investigating potential claims on behalf of purchasers of ${full_name} (“${short_name}” or “the Company”) (${exchange}: ${ticker}). Investors who purchased ${short_name} securities are encouraged to obtain additional information and assist the investigation.</p>

        <p>The investigation concerns whether ${short_name} has violated federal securities laws.</p>

        <p><strong>Investigation Details:</strong><br/>
        ${investigation_paragraph}</p>

        <p><strong>What’s Next?</strong><br/>
        If you are aware of any facts relating to this investigation or purchased ${short_name} securities, you can assist this investigation. You can also contact Peretz Bronstein or his law clerk and client relations manager, Yael Nathanson of Bronstein, Gewirtz & Grossman, LLC: <a href="tel:332-239-2660"> 332-239-2660</a>.</p>

        <p><strong>There is No Cost to You</strong><br/>
        We represent investors in class actions on a contingency fee basis. That means we will ask the court to reimburse us for out-of-pocket expenses and attorneys’ fees, usually a percentage of the total recovery, only if we are successful.</p>

        <p><strong>Why Bronstein, Gewirtz & Grossman:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC is a nationally recognized firm that represents investors in securities fraud class actions and shareholder derivative suits. Our firm has recovered hundreds of millions of dollars for investors nationwide.</p>

        <p>Attorney advertising. Prior results do not guarantee similar outcomes.</p>

        <p><strong>Contact:</strong><br/>
        Bronstein, Gewirtz & Grossman, LLC<br/>
        Peretz Bronstein or Yael Nathanson<br/>
        <a href="tel:332-239-2660">332-239-2660</a> | <a href="mailto:info@bgandg.com">info@bgandg.com</a></p>`
    );
};
