import Image from 'next/image';

export default function PostCard({ id, data }) {
    console.log(data);
    const {
        subreddit,
        title,
        body,
        author,
        upvotes,
        downvotes,
        image,
        permalink,
        comments,
        created,
        locked,
        awards
    } = data.data;
    
    return (
        <>
            <ul>
                <li>{subreddit}</li>
                <li>{title}</li>
                <li>{body}</li>
                <li>{author}</li>
                <li>{upvotes}</li>
                <li>{downvotes}</li>
                <li>{image}</li>
                <li>{permalink}</li>
                <li>{comments}</li>
                <li>{created}</li>
                <li>{locked}</li>
            </ul>
            {awards.map(award => {
                return (
                    <>
                        <img src={award.icon.url} width={50} height={50} />
                        <span>{award.count}</span>
                    </>
                );
            })}
        </>
    );
};