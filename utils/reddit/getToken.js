import Axios from 'axios';

const getToken = async (code) => {
    
    const config = {
        headers: {
            Authorization: `Basic ${process.env.REDDIT_BASIC_AUTH}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    
    const data = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDDIT_REDIRECT_URI,
    };
    
    const urlData = new URLSearchParams(data);
    
    try {
        const response = await Axios.post('https://www.reddit.com/api/v1/access_token', urlData, config);
        return response.data;
    } catch (error) {
        return console.log({
            error: error.message,
            data: error.response.data
        });
    }
};

export default getToken;