import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Enter(props) {
    const { user, username } = useContext(UserContext);
    return (
        <main>
            {user ?
                !username ? <UsernameForm /> :
                    <LogoutButton />
                : <LoginButton />
            }
        </main>
    )
}

const LoginButton = () => {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            <img src='https://developers.google.com/identity/images/g-logo.png'/>
            Sign in with Google
        </button>
    );
}

const LogoutButton = () => {
    return (
        <button className='logout-button' onClick={() => auth.signOut()}>Log out</button>
    )
}

const UsernameForm = () => {
    return null;
}