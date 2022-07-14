import Axios from 'axios';
import { useState } from 'react';

import { TextInput, Container, Button, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import PostCard from '../components/PostCard.js';
export default function Index(props) {
    const [post, setPost] = useState({ url: null, id: null, data: null });
    const [error, setError] = useState('');

    const parseIdFromURL = url => {
        validateRedditURL(url);
        const postId = url.split('comments/')[1].split('/')[0];
        return postId;
    };

    const validateRedditURL = url => {
        if (!url || !url.includes('comments/')) throw new Error('nah 2');
    };

    const getPost = async postUrl => {
        if (!postUrl) return;
        try {
            const postId = parseIdFromURL(postUrl);
            const response = await Axios.get(`/api/post/${postId}`);
            setPost(post => ({ ...post, data: response.data }));
        } catch (error) {
            setError(error.message);
        }
    };

    const getPostAsImage = () => {
        // convert entered post to image
    };

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Container>
            <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
            <TextInput
                label="Post URL"
                description="Link to the reddit post"
                style={{ width: 400 }}
                mb={10}
                onChange={e => getPost(e.currentTarget.value)}
            />
            <Button mb={20} disabled={!post.data} onClick={() => getPostAsImage()}>
                Get Post
            </Button>
            {error && error}
            {post.data && <PostCard data={post.data} />}
        </Container>
    );
}
