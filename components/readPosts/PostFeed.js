import Link from "next/link";
import { firestore } from "../../lib/firebase";
import HeartButton from "./HeartButton";
import AuthCheck from "../users/AuthCheck";
import { toast } from "react-toastify";

export default function PostFeed({ posts, admin }) {
  return posts ? (
    posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />)
  ) : (
    <div>Looks like there&#39;s nothing here...</div>
  );
}

function PostItem({ post, admin = false }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const readTime = (wordCount / 100 + 1).toFixed(0);
  const hearts = post.heartCount || 0;
  const uid = post.uid;
  const postRef = firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .doc(post.slug);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a className="username">
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span className="word-count">
          {" "}
          {wordCount} words. {wordCount > 100 ? readTime : "Less than 1"} min.
          to read.{" "}
        </span>
        <span className="push-left">
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
          {hearts} heart{hearts != 1 ? "s" : ""}
        </span>
      </footer>

      {admin && (
        <>
          <Link href={`admin/${post.slug}`}>
            <h3>
              <button className="btn-standard">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
