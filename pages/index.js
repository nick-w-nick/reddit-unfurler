import Axios from 'axios';
import { useState } from 'react';

import { TextInput, Container, Button, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import PostCard from '../components/PostCard.js';
export default function Index(props) {
    
    const getPost = async (postId) => {
        const response = await Axios.get(`/api/post/${postId}`);
        console.log(response.data);
        return setPost({ id: postId, data: response.data });
    };
    
    const [post, setPost] = useState({ id: null, data: null });
    
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
            <div>Hello, World!</div>
            <TextInput label="Post ID" description="tihp2q" onChange={e => setPost({ id: e.target.value, data: null })} />
            <Button onClick={async () => await getPost(post.id)}>Get Post</Button>
            
            {post.data && <PostCard id={post.id} data={post.data}/>}
        </Container>
    );
};