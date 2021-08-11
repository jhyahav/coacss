import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../lib/context';
import { debounce } from 'lodash';
import Metatags from '../components/general/Metatags';

//TODO: add user feedback on whether username is valid and/or available!
export default function Enter(props) {
    const { user, username } = useContext(UserContext);
    return (
        <main>
            <Metatags title='Log in'/>
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

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);
        try {
            const batch = firestore.batch();
            batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName});
            batch.set(usernameDoc, {uid: user.uid});
            await batch.commit();
            console.log('Batch transaction successful');
        } catch (error) {
           console.log('Batch transaction failed: ', error); 
        }
        
    }

    const checkUsername = useCallback(
        debounce (async (username) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log('Firestore read executed');
                setIsValid(!exists);
                setIsLoading(false);
            }
        }, 500), 
    []);
    return (
        !username && (
            <section>
                <h3>Pick a username!</h3>
                <form onSubmit={onFormSubmit}>
                    <input name='username' placeholder='Enter desired username' spellCheck='false' value={formValue} onChange={onFormChange}/>
                    <UsernameMessage username={formValue} isValid={isValid} isLoading={isLoading}/>
                    <button className='btn-green' type='submit' disabled={!isValid}>Choose</button>
                </form>
            </section>
        )
    );
}

const UsernameMessage = ( {username, isValid, isLoading}) => {
    if (isLoading) {
        return (
            <p>Checking username...</p>
        )
    } else if (isValid) {
        return (
            <p className='text-sucess'> "{username}" is available! </p>
        )
    } else if (!isValid && username.length > 3) {
        return (
            <p className='text-danger'> Sorry, that username is not available.</p>
        )
    } else {
        return <p>Usernames must be between 3 and 15 characters long and may only contain Latin letters and numbers.</p>;
    }
}