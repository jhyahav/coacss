import Link from 'next/link';
import Metatags from '../components/general/Metatags';

export default function NotFoundPage({ }) {
  return (
    <main>
        <Metatags title='Page not found' />
        <h1>404 - Page not found</h1>
        <p>Sorry, we couldn't find the page you were looking for 😞 </p>
        <img height='431px' width='647px' src='https://images.unsplash.com/photo-1453227588063-bb302b62f50b'/>
        <Link href='/'>
            <button className='btn-standard'>Back to home</button>
        </Link>
    </main>
  )
}