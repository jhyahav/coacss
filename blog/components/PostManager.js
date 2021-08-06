import PostForm from "./PostForm";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { firestore, auth } from "../lib/firebase";

export default function PostManager() {
    const [preview, setPreview] = useState(false);
    const router = useRouter();
    const { slug } = router.query;

    const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
    const [post] = useDocumentDataOnce(postRef);

    return (
        <main className='container'>
            {post && (
                <>
                    <section>
                        <h1>{post.title}</h1>
                        <PostForm postDefaults={post} postRef={postRef} preview={preview} />
                    </section>
                </>
            )}
        </main>
    );
}