import styles from "../../styles/Post.module.scss";
import PostContent from "../../components/readPosts/PostContent";
import Metatags from "../../components/general/Metatags";
import {
  firestore,
  postToJSON,
  getUserWithUsername,
  auth,
} from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import HeartButton from "../../components/readPosts/HeartButton";
import AuthCheck from "../../components/users/AuthCheck";
import { toast } from "react-toastify";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let path;
  let post;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());
    if (!post) {
      return {
        notFound: true,
      };
    }
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  //Select all the posts which already exist on Firebase at build time.
  const allExistingPosts = await firestore.collectionGroup("posts").get();
  //Use attributes of posts to select their paths to pass for SSG.
  const paths = allExistingPosts.docs.map((doc) => {
    const { username, slug } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function PostPage(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);
  const post = realtimePost || props.post;
  const hearts = post.heartCount || 0;

  return (
    <main className={styles.container}>
      <Metatags title={`'${post.title}' by @${post.username} - COACSS`} />
      <section>
        <PostContent post={post} />
      </section>
      <aside className="card">
        <p>
          <AuthCheck
            fallback={
              <span
                className="heart"
                onClick={() => toast.warn("You need to log in to heart posts.")}
              >
                💙
              </span>
            }
          >
            <HeartButton postRef={postRef} />
          </AuthCheck>
          <span>
            {hearts} heart{hearts != 1 ? "s" : ""}
          </span>
        </p>
      </aside>
    </main>
  );
}
