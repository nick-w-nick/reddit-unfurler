import Axios from 'axios';
import { useState } from 'react';

import {
    TextInput,
    Container,
    Button,
    ActionIcon,
    useMantineColorScheme,
    Badge,
    Loader
} from '@mantine/core';
import { Sun, MoonStars, AlertCircle, CircleCheck } from 'tabler-icons-react';

import PostCard from '../components/PostCard.js';
export default function Index(props) {
    const [post, setPost] = useState({ url: null, id: null, data: null });
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const parseIdFromURL = url => {
        validateRedditURL(url);
        const postId = url.split('comments/')[1].split('/')[0];
        return postId;
    };

    const validateRedditURL = url => {
        if (!url || !url.includes('comments/')) throw new Error('Invalid Reddit Link');
    };

    const getPost = async postUrl => {
        setLoading(true);
        if (!postUrl) {
            setPost(post => ({ ...post, data: null }));
            setError('');
            setLoading(false);
            return;
        }
        try {
            const postId = parseIdFromURL(postUrl);
            const response = await Axios.get(`/api/post/${postId}`);
            setLoading(false);
            setPost(post => ({ ...post, data: response.data }));
            setError('');
        } catch (error) {
            setLoading(false);
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
                error={error}
                description="Link to the reddit post"
                style={{ width: 400 }}
                styles={{
                    wrapper: { overflow: 'hidden' }
                }}
                mb={10}
                rightSection={
                    <Badge
                        radius={0}
                        p="6px"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderBottomRightRadius: '4px',
                            borderTopRightRadius: '4px'
                        }}
                    >
                        {error && (
                            <AlertCircle size="full" style={{ display: 'block', opacity: 0.5 }} />
                        )}
                        {loading && (
                            <Loader size="full" style={{ display: 'block', opacity: 0.5 }} />
                        )}
                        {post.data && (
                            <CircleCheck size="full" style={{ display: 'block', opacity: 0.5 }} />
                        )}
                    </Badge>
                }
                onChange={e => getPost(e.currentTarget.value)}
            />
            <Button mb={20} disabled={!post.data} onClick={() => getPostAsImage()}>
                Get Post
            </Button>
            {post.data && <PostCard data={post.data} />}
        </Container>
    );
}
