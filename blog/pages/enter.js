import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext, useState } from 'react';
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
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {user, username} = useContext(UserContext);
    
    useEffect(() => {
        checkUsername(formValue);
    }, [formValue])

    const onFormChange = (e) => {
        const val = e.target.value.toLowerCase();
        const charRegex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (val.length < 3) {
            setFormValue(val);
            setIsValid(false);
            setIsLoading(false);
        }
        if (charRegex.test(val)) {
            setFormValue(val);
            setIsValid(false);
            setIsLoading(true);
        }

    }

    const onFormSubmit = (e) => {

    }

    const checkUsername = async (username) => {
        if (username.length >= 3) {
            ref = firestore.doc(`usernames/${username}`);
            const { exists } = await ref.get();
            console.log('Firestore read executed');
            setIsValid(!exists);
            setIsLoading(false);
        }
    }
    return (
        !username && (
            <section>
                <h3>Pick a username!</h3>
                <form onSubmit={onFormSubmit}>
                    <input name='username' placeholder='Enter requested username' value={formValue} onChange={onFormChange}/>
                    <button className='btn-green' type='submit' disabled={!isValid}>Choose</button>
                </form>
            </section>
        )
    );
}