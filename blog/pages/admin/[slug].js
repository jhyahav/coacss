import AuthCheck from '../../components/users/AuthCheck';
import PostManager from '../../components/PostManager';

export default function AdminPostEdit(props) {
  
  return (
    <main>
        <AuthCheck>
          <PostManager />
        </AuthCheck>
    </main>
  )
}