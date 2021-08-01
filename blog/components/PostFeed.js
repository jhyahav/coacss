import Link from 'next/link';

export default function PostFeed( {posts, admin} ) {
    return posts ? 
    posts.map((post) => <PostItem post={post} key={post.slug} admin={admin}/>) :
    <div>Looks like there's nothing here...</div>;
}

function PostItem( {post, admin = false} ) {
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const readTime = (wordCount / 100 + 1).toFixed(0);   
    
    return (
        <div className='card'>
            <Link href={`/${post.username}`}>
                <a>
                    <strong>
                        By @{post.username}
                    </strong>
                </a>
            </Link>
            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a>{post.title}</a>
                </h2>
            </Link>
            <footer>
                <span> {wordCount} words. {wordCount > 100 ? readTime : 'Less than 1'} min. to read. </span>
            </footer>
        </div>
    );
}
