import { Loader, TextInput, useMantineTheme } from '@mantine/core';
import { AlertCircle, CircleCheck } from 'tabler-icons-react';

const RedditLinkInput = ({ post, error, loading, fetchPost }) => {
    const theme = useMantineTheme();

    return (
        <TextInput
            onChange={e => fetchPost(e.currentTarget.value)}
            label="Reddit URL"
            description="Link to the reddit post"
            error={error}
            style={{ flex: '1' }}
            styles={{ error: { position: 'absolute' } }}
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
            rightSection={
                <>
                    {error && (
                        <AlertCircle
                            color={theme.colors.red[6]}
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
                            color={theme.colors.green[6]}
                            style={{ display: 'block', opacity: 0.9 }}
                        />
                    )}
                </>
            }
        />
    );
};
export default RedditLinkInput;
