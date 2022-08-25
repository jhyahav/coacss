import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import UserProfile from '../../components/users/UserProfile';
import PostFeed from '../../components/readPosts/PostFeed';
import Metatags from '../../components/general/Metatags';

export async function getServerSideProps( {query} ) {

  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
        notFound: true
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
    .collection('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }
  
  return {
    props: {user, posts},
  }
}

export default function UserProfilePage( {user, posts} ) {
  return (
    <main>
        <Metatags title={`@${user.username} - user profile`} description={`Check out @${user.username}'s latests posts on COACSS`} />
        <UserProfile user={user}/>
        <PostFeed posts={posts}/>
    </main>
  )
}