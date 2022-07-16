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
import usePost from '../hooks/usePost.js';

export default function Index() {
    const { post, loading, error, fetchPost } = usePost();

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
                onChange={e => fetchPost(e.currentTarget.value)}
                label="Post URL"
                error={error}
                description="Link to the reddit post"
                style={{ width: 400 }}
                styles={{
                    wrapper: { overflow: 'hidden' }
                }}
                mb={10}
                rightSection={
                    <>
                        {error && (
                            <AlertCircle
                                color="#EF4444"
                                style={{ display: 'block', opacity: 0.5 }}
                                // breaks when typing
                            />
                        )}
                        {loading && (
                            <Loader
                                color="#4ADE80"
                                style={{ display: 'block', opacity: 0.5, margin: '7px' }}
                            />
                        )}
                        {post && (
                            <CircleCheck
                                color="#22C55E"
                                style={{ display: 'block', opacity: 0.5 }}
                            />
                        )}
                    </>
                }
                // rightSection={
                //     <div radius={0} p="6px" style={{ display: 'flex', padding: '5px' }}>
                //         {error && (
                //             <AlertCircle
                //                 size="sm"
                //                 color="#EF4444"
                //                 style={{ display: 'block', opacity: 0.5 }}
                //                 // breaks when typing
                //             />
                //         )}
                //         {loading && (
                //             <Loader
                //                 color="#4ADE80"
                //                 size={'sm'}
                //                 style={{ display: 'block', opacity: 0.5 }}
                //             />
                //         )}
                //         {post && (
                //             <CircleCheck
                //                 color="#22C55E"
                //                 size={'sm'}
                //                 style={{ display: 'block', opacity: 0.5 }}
                //             />
                //         )}
                //     </div>
                // }
            />
            <Button mb={20} disabled={!post} onClick={() => getPostAsImage()}>
                Get Post
            </Button>
            {post && <PostCard post={post} />}
        </Container>
    );
}
