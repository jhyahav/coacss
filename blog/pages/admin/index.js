import AuthCheck from '../../components/users/AuthCheck';
import PostList from '../../components/PostList';
import CreatePost from '../../components/writePosts/CreatePost';


//Uses CSR because SEO/crawling is unimportant here
export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreatePost />
      </AuthCheck>
    </main>
  );
}

