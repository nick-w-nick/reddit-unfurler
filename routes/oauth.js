import { Router } from 'express';
const router = Router();

import getToken from '../utils/reddit/getToken.js';

router.get('/', async (req, res) => {
    try {
        const { code } = req.query;
        
        const token = await getToken(code);
        
        console.log(token);
        
        return res.status(200).send({
            status: 'success',
            data: 'data'
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            data: error.message
        });
    }
});

export default router;