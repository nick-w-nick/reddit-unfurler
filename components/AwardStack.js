import { Image } from '@mantine/core';

export default function AwardStack({ awards }) {
    const images = awards.map((award, index) => {
        return (
            <Image style={{ position: 'absolute' }} pl={index * 5} src={award} height={15} width={15} key={award} />
        )
    });
    
    return (
        <span style={{ position: 'relative', height: '15', width: '15' }}>
            {images}
        </span>
    );
};