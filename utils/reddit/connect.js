import snoowrap from 'snoowrap';
import 'dotenv/config';

const connect = new snoowrap({
    userAgent: 'reddit-unfurler (github/nick-w-nick)',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN
});

export default connect;