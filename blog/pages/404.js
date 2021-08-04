import Link from 'next/link';

export default function NotFoundPage({ }) {
  return (
    <main>
        <h1>404 - Page not found</h1>
        <p>Sorry, we couldn't find the page you were looking for 😞 </p>
        <img height='431px' width='647px' src='https://images.unsplash.com/photo-1453227588063-bb302b62f50b'/>
        <Link href='/'>
            <button className='button-standard'>Back to home</button>
        </Link>
    </main>
  )
}