// import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

export default function App(props) {
    const { Component, pageProps } = props;
    
    const [colorScheme, setColorScheme] = useState('dark');
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            {/* <Head>
                <title>Reddit Unfurler</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head> */}
            
            <MantineProvider theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCS
            >
                <Component {...pageProps} />
            </MantineProvider>
        </ColorSchemeProvider>
    );
};