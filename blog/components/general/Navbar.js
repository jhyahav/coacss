import navstyles from '../../styles/Navbar.module.scss';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    return (
        <nav className={navstyles.navbar}>
            <ul>
                <li>
                    <Link href='/'>
                        <button className='btn-logo'> 
                        Coa &#123;
                        <span id='code'>css</span>
                        &#125; 
                        </button>
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

/*
Should definitely create custom NavItem component for styled sidebar

<nav class="nav-bar">
        <ul class="nav-container">
            <li id="logo" class="nav-item">
                <Link href="/" class="nav-link">
                    <object data="https://jhyahav.github.io/sinensis/icons/leaf.svg" type="image/svg+xml" class="nav-icon material-icons"></object>
                    <span class="link-text">
                        COACSS
                    </span>
                </Link>
            </li>

            <li id="browse" class="nav-item">
                <Link href="#" class="nav-link">
                    <i class="nav-icon material-icons">search</i>
                    <span class="link-text">
                        browse
                    </span>
                </Link>
            </li>
            <li id="teaducation" class="nav-item" onclick="contentLoader(this.id)">
                <a href="#" class="nav-link">
                    <i class="nav-icon material-icons">school</i>
                    <span class="link-text">
                        teaducation
                    </span>
                </a>
            </li>
            <li id="vendors" class="nav-item" onclick="contentLoader(this.id)">
                <a href="#" class="nav-link">
                    <i class="nav-icon material-icons">storefront</i>
                    <span class="link-text">
                        vendors
                    </span>
                </a>
            </li>
            <li id="about" class="nav-item" onclick="contentLoader(this.id)">
                <a href="#" class="nav-link">
                    <i class="nav-icon material-icons">help</i>
                    <span class="link-text">
                        about&nbsp;/&nbsp;faq
                    </span>
                </a>
            </li>
        </ul>
    </nav> */