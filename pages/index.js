import Axios from 'axios';
import { useState } from 'react';

import { TextInput, Container, Button } from '@mantine/core';

import PostCard from '../components/PostCard.js';
export default function Index(props) {
    
    const getPost = async (postId) => {
        const response = await Axios.get(`/api/post/${postId}`);
        console.log(response.data);
        return setPost({ id: postId, data: response.data });
    };
    
    const [post, setPost] = useState({ id: null, data: null });
    return (
        <Container>
            <div>Hello, World!</div>
            <TextInput label="Post ID" description="tihp2q" onChange={e => setPost({ id: e.target.value, data: null })} />
            <Button onClick={async () => await getPost(post.id)}>Get Post</Button>
            
            {post.data && <PostCard id={post.id} data={post.data}/>}
        </Container>
    );
};