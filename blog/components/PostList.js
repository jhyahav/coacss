import PostFeed from "./PostFeed";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore, auth } from "../lib/firebase";

export default function PostList() {
    const userPostsQuery = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').orderBy('createdAt', 'desc');
    const [posts] = useCollectionData(userPostsQuery);
    /*TODO: add UI element for cases where the user has no posts. 
    const [posts] currently returns Array(0) which evaluates as true.
    Checking length also doesn't work...*/

    return (
        <>
            <h1>Manage posts</h1>
            <PostFeed posts={posts} admin/>
        </>
    );
}