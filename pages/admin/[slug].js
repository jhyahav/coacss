import AuthCheck from "../../components/users/AuthCheck";
import PostManager from "../../components/writePosts/PostManager";
import Head from "next/head";

export default function AdminPostEdit(props) {
  return (
    <main>
      <AuthCheck>
        <Head>
          <title>Edit post - COACSS</title>
        </Head>
        <PostManager />
      </AuthCheck>
    </main>
  );
}
