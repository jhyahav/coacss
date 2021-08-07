import AuthCheck from '../../components/AuthCheck';
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