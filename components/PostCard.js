import { Card, Image, Text, Group, useMantineTheme, Title, Avatar, AvatarsGroup, Center } from '@mantine/core';
import { ArrowNarrowUp, Message2, Calendar } from 'tabler-icons-react';

export default function PostCard({ data }) {
    const theme = useMantineTheme();
    
    const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];
    
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
    } = data.data;
    
    const generateAwards = (awards) => {
        if (!awards || !awards.length) {
            return null;
        }
        const topThree = awards.sort((a, b) => a - b)
            .slice(0, 3)
            .map(award => award.icon.url);
        
        const totalAwards = awards.reduce((acc, award) => acc + award.count, 0);
        
        return {
            topThree,
            totalAwards
        };
    };
    
    const { topThree, totalAwards } = generateAwards(awards);
    
    return (
        <>
            <div style={{ width: 400, margin: 'auto',  }} >
                <Card shadow="sm" p="lg">
                    <Card.Section>
                        <Image src={image} width={400} alt={title} />
                    </Card.Section>
                </Card>
                
                <Title order={4} mt={10}>{title}</Title>
                
                <Text color={secondaryColor} size="md" mt={10}>in <Text color={secondaryColor} size="sm" weight="600" component="span">{subreddit} </Text>by <Text color={secondaryColor} size="sm" weight="600" component="span">u/{author}</Text></Text>
                
                <Group position="left">
                    <Text weight={500} color={secondaryColor} size="sm" mt={10}><ArrowNarrowUp size={15} />{upvotes}</Text>
                    <Text weight={500} color={secondaryColor} size="sm" mt={10}><Message2 size={15} />{comments}</Text>
                    <Text weight={500} color={secondaryColor} size="sm" mt={10}><Calendar size={15} />{created}</Text>
                    <AvatarsGroup size={20} limit={3} total={topThree < 3 && totalAwards}>
                        {topThree.map(award => {
                            return (
                                <Avatar src={award} key={award} />
                            );
                        })}
                    </AvatarsGroup>
                    <Text color={secondaryColor} size="sm" mt={10}>{totalAwards}</Text>
                </Group>
            </div>
        </>
    );
};