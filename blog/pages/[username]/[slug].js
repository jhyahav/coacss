import styles from '../../styles/Post.module.css';
import PostContent from '../../components/PostContent';
import { firestore, postToJSON, getUserWithUsername } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export async function getStaticProps({ params }) {
  const {username, slug} = params;
  const userDoc = await getUserWithUsername(username);

  let path;
  let post;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;

  }

  return {
    props: {post, path},
    revalidate: 5000
  }
}

export async function getStaticPaths() {
  //Select all the posts which already exist on Firebase at build time.
  const allExistingPosts = await firestore.collectionGroup('posts').get();
  //Use attributes of posts to select their paths to pass for SSG.
  const paths = allExistingPosts.docs.map( (doc) => {
    const { username, slug } = doc.data();
    return {
      params: {username, slug}
    }
  });

  return {
    paths,
    fallback: 'blocking'
  }
}

export default function PostPage(props) {
  return (
    <main className={styles.container}>
      {/*TODO fill in w/ hydration*/}
      <PostContent post={props.post} />  
    </main>
  )
}