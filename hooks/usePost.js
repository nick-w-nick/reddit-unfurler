import { useState } from 'react';
import { parseIdFromURL } from '../utils/utils';

import Axios from 'axios';

const usePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [post, setPost] = useState(null);

    const fetchPost = async postUrl => {
        setLoading(true);
        setError('');
        setPost(null);
        if (!postUrl) {
            setLoading(false);
            return;
        }
        try {
            const postId = parseIdFromURL(postUrl);
            const { data } = await Axios.get(`/api/post/${postId}`);
            setLoading(false);
            setPost(post => data.data);
            setError('');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return { error, loading, post, fetchPost };
};
export default usePost;
