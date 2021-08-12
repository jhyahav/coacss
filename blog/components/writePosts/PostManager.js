import styles from '../../styles/Admin.module.scss';
import PostForm from "./PostForm";
import DeletePost from "./DeletePost";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { firestore, auth } from "../../lib/firebase";

export default function PostManager() {
    const [preview, setPreview] = useState(false);
    const router = useRouter();
    const { slug } = router.query;

    const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
    const [post] = useDocumentData(postRef);

    return (
        <main className={styles.container}>
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <PostForm postDefaults={post} postRef={postRef} preview={preview} />
                    </section>
                    <aside>
                        <h3>Tools</h3>
                        <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview' }</button>
                        <Link href={`/${post.username}/${post.slug}`}>
                            <button disabled={!post.published}>{post.published ? 'Live view' : 'Publish post to see live view'}</button>
                        </Link>
                        <DeletePost postRef={postRef}/>
                    </aside>
                </>
            )}
        </main>
    );
}