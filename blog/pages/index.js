import styles from '../styles/Home.module.scss'
import Loader from '../components/Loader';
import PostFeed from '../components/PostFeed';
import { firestore, postToJSON, fromMillis } from '../lib/firebase';
import { useState } from 'react';
import Metatags from '../components/Metatags';

const POST_LIMIT = 10;
const query = firestore
  .collectionGroup('posts')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc');

export async function getServerSideProps(context) {
  const postQuery = query.limit(POST_LIMIT);

  const posts = (await postQuery.get()).docs.map(postToJSON);

  return {
    props: {posts}
  }
}

export default function Home(props) {
  
  const [posts, setPosts] = useState(props.posts);
  const [isLoading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const clientLoadPosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const queryCursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const addQuery = query.startAfter(queryCursor).limit(POST_LIMIT);

    const morePosts = (await addQuery.get()).docs.map((doc) => doc.data());
    setPosts(posts.concat(morePosts));
    setLoading(false);
    if (morePosts.length < POST_LIMIT) {
      setPostsEnd(true);
    }
  }
  return (
    <main>
      <Metatags title='Home'/>
      {/*<button onClick={() => toast.success('Toasty!')}>Display a toast notification</button>*/}
      <PostFeed posts={posts}/>
      {!postsEnd && !isLoading && <button onClick={clientLoadPosts}>Load more posts</button>}
      <Loader show={isLoading}/>
      {postsEnd && <p>No more posts to show!</p>}
    </main>
  )
}
