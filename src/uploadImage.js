import axios from 'axios';

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

export default uploadImage;
