export const parseIdFromURL = url => {
    validateRedditURL(url);
    const postId = url.split('comments/')[1].split('/')[0];
    return postId;
};

const validateRedditURL = url => {
    if (!url.includes('comments/')) throw new Error('Invalid Reddit Link');
};
