import Axios from 'axios';

const getToken = async (code) => {
    
    const toBase64 = (string) => Buffer.from(string).toString('base64');
    
    const config = {
        headers: {
            Authorization: `Basic ${toBase64(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_SECRET)}`,
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