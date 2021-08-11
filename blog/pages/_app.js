import Navbar from '../components/general/Navbar';
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css';
import useUserData from '../lib/hooks';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../lib/context';

/* TODO: Feature ideas:
1. Infinite scroll to load more posts.
2. Customizable bio on user profile pages.
3. Shrink oversized images on upload (cloud?)
4. Make hearts appear to update live on server-side rendered pages (very tricky/hacky)
5. Add comment sections to posts (maybe sub-implementation of post logic?)
*/

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </UserContext.Provider>
  );
}

export default MyApp
