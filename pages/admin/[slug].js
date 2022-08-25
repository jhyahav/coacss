import AuthCheck from '../../components/users/AuthCheck';
import PostManager from '../../components/writePosts/PostManager';

export default function AdminPostEdit(props) {
  
  return (
    <main>
        <AuthCheck>
          <PostManager />
        </AuthCheck>
    </main>
  )
}