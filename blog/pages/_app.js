import Navbar from '../components/general/Navbar';
import Head from 'next/head';
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css';
import useUserData from '../lib/hooks';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../lib/context';

/* TODO: Feature ideas:
0. Security rules.
1. Update navbar. And a general redesign from the ground up, obviously.
2. Infinite scroll to load more posts.
3. Light & dark modes
4. Customizable bio on user profile pages.
5. Shrink oversized images on upload (cloud?)
6. Make hearts appear to update live on server-side rendered pages (very tricky/hacky)
7. Add comment sections to posts (maybe sub-implementation of post logic?) 
8. Welcome interface for first-time login
9. Pinned posts?
10. About (maybe as a pinned post!)
*/

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Rock+Salt&family=Heebo&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </UserContext.Provider>
  );
}

export default MyApp
