import { Router } from 'express';
const router = Router();

import reddit from '../utils/reddit/connect.js';

router.get('/:submission', async (req, res) => {
    const { submission } = req.params;
    
    try {
        const post = await reddit.getSubmission(submission).fetch();
        
        const { 
            subreddit_name_prefixed: subreddit,
            title,
            author: { name: authorName },
            ups: upvotes,
            downs: downvotes,
            preview: { images } = {},
            permalink,
            created,
            num_comments: comments,
            locked,
            all_awardings,
            selftext: body,
        } = post;
        
        const awards = all_awardings.map(award => {
            const { icon_url, resized_icons, count, name } = award;
            const icon = resized_icons.filter(icon => icon.width === 64)[0] || icon_url;
            
            return {
                icon,
                count,
                name
            };
        });
        
        return res.status(200).send({
            status: 'success',
            data: {
                subreddit,
                title,
                body,
                author: authorName,
                upvotes,
                downvotes,
                image: images?.[0].source.url,
                permalink: `https://reddit.com${permalink}`,
                comments,
                created: new Date(created * 1000).toLocaleDateString(),
                locked,
                awards
            }
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            data: error.message
        });
    }
});

export default router;