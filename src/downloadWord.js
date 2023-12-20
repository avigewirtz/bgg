import { Document, Packer, Paragraph, TextRun, ExternalHyperlink} from 'docx';

export const downloadDocument = (content, fileName) => {
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
               a.download = fileName;
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
        "There is No Cost to You",
        "Contact",
        "Case Details:",
        "Class Definition:"
    ];

    const lines = content.split('\n');
  let isFirstParagraph = true;

  const processLink = (part, linkType, isBold) => {
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

  const processPhone = (number, isBold) => {
    return new ExternalHyperlink({
      children: [
        new TextRun({
          text: number,
          style: "Hyperlink",
          bold: isBold
        })
      ],
      link: `tel:${number}`
    });
  };

  return lines.map((line, index) => {
    const isBold = isFirstParagraph || boldKeywords.some(keyword => line.startsWith(keyword));
    if (isFirstParagraph && index > 0) isFirstParagraph = false;

    const words = line.split(' ');
    const runs = words.map((word, index) => {
      const hasTrailingPeriod = word.endsWith('.');
      const cleanWord = hasTrailingPeriod ? word.slice(0, -1) : word; // Remove the trailing period if it exists
      const separator = index < words.length - 1 ? ' ' : ''; // Add space unless it's the last word

      if (/^bgandg\.com\/\S+$/.test(cleanWord)) {
        return [processLink(cleanWord, "url", isBold), new TextRun({ text: hasTrailingPeriod ? '. ' : separator })];
      } else if (cleanWord === 'info@bgandg.com') {
        return [processLink(cleanWord, "email", isBold), new TextRun({ text: hasTrailingPeriod ? '. ' : separator })];
      } else if (cleanWord === '332-239-2660') {
        return [processPhone(cleanWord, isBold), new TextRun({ text: hasTrailingPeriod ? '. ' : separator })];
      } else {
        return new TextRun({
          text: word + separator,
          bold: isBold
        });
      }
    }).flat();

    return new Paragraph({ children: runs });
  });
};