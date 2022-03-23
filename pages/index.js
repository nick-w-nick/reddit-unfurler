import Axios from 'axios';
import { useState } from 'react';

import { TextInput, Container, Button, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import PostCard from '../components/PostCard.js';
export default function Index(props) {
    const parseIdFromURL = (url) => {
        const postId = url.split('comments/')[1].split('/')[0];
        return postId;
    };
    
    const getPost = async (postUrl) => {
        const postId = parseIdFromURL(postUrl);
        const response = await Axios.get(`/api/post/${postId}`);
        return setPost({ ...post, id: postId, data: response.data });
    };
    
    const [post, setPost] = useState({ url: null, id: null, data: null });
    
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
            <TextInput label="Post URL" description="Link to the reddit post" style={{ width: 400 }} mb={10} onChange={e => setPost({ ...post, url: e.target.value })} />
            <Button mb={20} onClick={async () => await getPost(post.url)}>Get Post</Button>
            
            {post.data && <PostCard data={post.data}/>}
        </Container>
    );
};