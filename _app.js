import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Reddit Unfurler</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            
            <MantineProvider
                theme={{ colorScheme: 'dark' }}
                withGlobalStyles
                withNormalizeCSS
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
};