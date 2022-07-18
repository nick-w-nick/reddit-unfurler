import {
    TextInput,
    Container,
    Button,
    ActionIcon,
    useMantineColorScheme,
    Loader,
    Group,
    MediaQuery
} from '@mantine/core';

import { Sun, MoonStars, AlertCircle, CircleCheck, BrandReddit } from 'tabler-icons-react';
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
        <Container size={'md'}>
            <Group align={'end'}>
                <MediaQuery smallerThan={'xs'} styles={{ width: '100%', flex: 'none !important' }}>
                    <TextInput
                        onChange={e => fetchPost(e.currentTarget.value)}
                        value="https://www.reddit.com/r/DIY/comments/w0n6m0/minisplit_installation_revised_and_updated/"
                        label="Post URL"
                        style={{ flex: '1' }}
                        sx={theme => {
                            if (post) {
                                return {
                                    input: {
                                        borderColor: theme.colors.green[6] + ' !important',
                                        '&:focus': {
                                            borderColor:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.green[6] + ' !important'
                                                    : theme.colors.green[6] + ' !important'
                                        },
                                        '&:focus-within': {
                                            borderColor:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.green[6] + ' !important'
                                                    : theme.colors.green[6] + ' !important'
                                        }
                                    }
                                };
                            }

                            if (error) {
                                return {
                                    input: {
                                        '&:focus': {
                                            borderColor:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.red[6] + ' !important'
                                                    : theme.colors.red[6] + ' !important'
                                        },
                                        '&:focus-within': {
                                            borderColor:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.red[6] + ' !important'
                                                    : theme.colors.red[6] + ' !important'
                                        }
                                    }
                                };
                            }

                            if (!error)
                                return {
                                    input: {
                                        '&:focus': {
                                            borderColor:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.blue[7] + ' !important'
                                                    : theme.colors.blue[5] + ' !important'
                                        },
                                        '&:focus-within': {
                                            borderColor:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.blue[7] + ' !important'
                                                    : theme.colors.blue[5] + ' !important'
                                        }
                                    }
                                };
                        }}
                        error={error}
                        description="Link to the reddit post"
                        rightSection={
                            <>
                                {error && (
                                    <AlertCircle
                                        color="#fa5252"
                                        style={{ display: 'block', opacity: 0.9 }}
                                    />
                                )}
                                {loading && (
                                    <Loader
                                        color="blue"
                                        style={{ display: 'block', opacity: 0.9, margin: '7px' }}
                                    />
                                )}
                                {post && (
                                    <CircleCheck
                                        color="#38d9a9"
                                        style={{ display: 'block', opacity: 0.9 }}
                                    />
                                )}
                            </>
                        }
                    />
                </MediaQuery>

                <ActionIcon
                    size={'36px'}
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Toggle color scheme"
                >
                    {dark ? <Sun size={20} /> : <MoonStars size={20} />}
                </ActionIcon>

                <Button leftIcon={<BrandReddit size={20} />} onClick={() => getPostAsImage()}>
                    Unfurl
                </Button>
            </Group>

            {/* disabled={!post} */}

            {post && <PostCard post={post} />}
        </Container>
    );
}
