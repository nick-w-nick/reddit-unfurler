import Axios from 'axios';

export default async function handler(req, res) {
    const { postId } = req.query;

    try {
        const response = await Axios.get(`https://reddit.com/${postId}.json`);
        const post = response.data[0].data.children[0].data;

        const {
            subreddit_name_prefixed: subreddit,
            title,
            author,
            ups: upvotes,
            downs: downvotes,
            url: imageUrl,
            permalink,
            created,
            num_comments: comments,
            locked,
            all_awardings,
            selftext: body
        } = post;

        const awards = all_awardings.map(award => {
            const { icon_url, resized_icons, count, name } = award;
            const icon = resized_icons.filter(icon => icon.width === 64)[0] || icon_url;

            if (icon.url.includes('amp;')) icon.url = icon.url.replaceAll('amp;', '');

            return {
                icon,
                count,
                name
            };
        });

        return res.status(200).json({
            status: 'success',
            data: {
                subreddit,
                title,
                body,
                author,
                upvotes,
                downvotes,
                image: imageUrl,
                permalink: `https://reddit.com${permalink}`,
                comments,
                created: new Date(created * 1000).toLocaleDateString(),
                locked,
                awards
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            data: error.message
        });
    }
}
