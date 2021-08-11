import Navbar from '../components/general/Navbar';
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css';
import useUserData from '../lib/hooks';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../lib/context';

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
