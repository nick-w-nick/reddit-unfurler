import getToken from '../../utils/reddit/getToken.js';

export default async function handler(req, res) {
    try {
        const { code } = req.query;
        
        const token = await getToken(code);
        
        return res.status(200).send({
            status: 'success',
            data: token
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            data: error.message
        });
    }
};