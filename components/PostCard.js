import {
    Card,
    Image,
    Text,
    useMantineTheme,
    Title,
    Avatar,
    AvatarsGroup,
    Box,
    Center,
    Paper,
    Container
} from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { ArrowNarrowUp, Message2, Calendar } from 'tabler-icons-react';

export default function PostCard({ post }) {
    const theme = useMantineTheme();

    const secondaryColor =
        theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

    const {
        subreddit,
        title,
        body,
        author,
        upvotes,
        image,
        permalink,
        comments,
        created,
        locked,
        awards
    } = post;

    const RenderAwards = () => {
        const topThree = awards
            .sort((a, b) => a - b)
            .slice(0, 3)
            .map(award => award.icon.url);

        const totalAwards = awards.reduce((acc, award) => acc + award.count, 0);

        return (
            <Center inline style={{ marginLeft: '10px' }}>
                <AvatarsGroup size={20} limit={3} total={topThree < 3 && totalAwards}>
                    {topThree.map(award => {
                        return <Avatar src={award} key={award} />;
                    })}
                </AvatarsGroup>
                <Box style={{ fontWeight: 600, fontSize: '15px', display: 'inline' }}>
                    {totalAwards}
                </Box>
            </Center>
        );
    };

    return (
        <Container size={'sm'}>
            <Paper px={'lg'} py={'lg'}>
                {/* <Card shadow="sm" p="lg">
                    <Card.Section>
                        remove
                        <Image src={image} width={600} alt={title} />
                    </Card.Section>
                </Card> */}
                <Text color={secondaryColor} size="md">
                    In{' '}
                    <Text color={secondaryColor} size="sm" weight="600" component="span">
                        {subreddit}{' '}
                    </Text>
                    Post by{' '}
                    <Text color={secondaryColor} size="sm" weight="600" component="span">
                        u/{author}
                    </Text>
                </Text>
                <Title order={4} mt={10}>
                    {title}
                </Title>

                <Box color={secondaryColor}>
                    <Center inline>
                        <ArrowNarrowUp size={20} style={{ verticalAlign: 'middle' }} />
                        <Box>{upvotes}</Box>
                    </Center>
                    <Center inline style={{ marginLeft: '10px' }}>
                        <Message2 size={20} style={{ verticalAlign: 'middle' }} />
                        <Box>{comments}</Box>
                    </Center>
                    <Center inline style={{ marginLeft: '10px' }}>
                        <Calendar size={20} style={{ verticalAlign: 'middle' }} />
                        <Box>{created}</Box>
                    </Center>

                    <RenderAwards />

                    <ReactMarkdown components={{ image: img => console.log(img) }}>
                        {body}
                    </ReactMarkdown>
                </Box>
            </Paper>
        </Container>
    );
}
