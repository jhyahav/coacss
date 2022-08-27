import AuthCheck from "../../components/users/AuthCheck";
import PostList from "../../components/readPosts/PostList";
import CreatePost from "../../components/writePosts/CreatePost";
import Head from "next/head";

//Uses CSR because SEO/crawling is unimportant here
export default function AdminPostsPage(props) {
  return (
    <>
      <Head>
        <title>Manage posts - COACSS</title>
      </Head>
      <main>
        <AuthCheck>
          <CreatePost />
          <PostList />
        </AuthCheck>
      </main>
    </>
  );
}
