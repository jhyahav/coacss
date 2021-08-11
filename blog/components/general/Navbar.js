import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href='/'>
                        <button className='btn-logo'> FEED </button>
                    </Link>
                </li>

                {/* logged in - username returns true*/}
                {username && (
                    <>
                        <li>
                            <Link href='/admin'>
                                <button className='btn-standard'> Write posts </button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                    </>
                )}

                {/* logged out - username = null */}
                {!username && (
                    <li>
                        <Link href='/enter'>
                            <button className='btn-standard'> Log in </button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}