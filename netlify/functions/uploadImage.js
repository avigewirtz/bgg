const axios = require('axios');
const FormData = require('form-data');

exports.handler = async (event) => {
  const { imageFileName, imageFileType, imageData } = JSON.parse(event.body);

  // Get sensitive WordPress credentials from environment variables in Netlify
  const wpUsername = process.env.WP_USERNAME;
  const wpPassword = process.env.WP_APP_PASSWORD;

  // Decode the Base64 encoded image (assuming you will send the image data in Base64)
  const imageBuffer = Buffer.from(imageData, 'base64');

  const formData = new FormData();
  formData.append('file', imageBuffer, {
    filename: imageFileName,
    contentType: imageFileType,
    knownLength: imageBuffer.length
  });

  const headers = {
    'Authorization': `Basic ${Buffer.from(`${wpUsername}:${wpPassword}`).toString('base64')}`,
    ...formData.getHeaders(),
  };

  try {
    // Upload the image to WordPress
    const response = await axios.post('https://bgandg.com/wp-json/wp/v2/media', formData, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify({ mediaId: response.data.id }),
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error uploading image' }),
    };
  }
};
