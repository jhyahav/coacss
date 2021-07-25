import Link from 'next/link';

export default function Navbar() {
    const user = null;
    const username = null;
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href='/'>
                        <button> FEED </button>
                    </Link>
                </li>

                {/* logged in - username returns true*/}
                {username && (
                    <>
                        <li>
                            <Link href='/admin'>
                                <button> Write posts </button>
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
                            <button> Log in </button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}