import Link from 'next/link';
import Image from 'next/image'
import Metatags from '../components/general/Metatags';

export default function NotFoundPage({ }) {
  return (
    <main>
        <Metatags title='Page not found' />
        <h1>404 - Page not found</h1>
        <p>Sorry, we couldn&#39;t find the page you were looking for 😞 </p>
        <Image src='https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' height={431} width={647} alt='Image of sad dog'/>
        <Link href='/'>
            <button className='btn-standard'>Back to home</button>
        </Link>
    </main>
  )
}