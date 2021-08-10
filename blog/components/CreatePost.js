import { useRouter } from 'next/router';
import { kebabCase, debounce } from 'lodash';
import { toast } from 'react-toastify';
import { firestore, auth, serverTimestamp } from "../lib/firebase";
import { useContext, useState, useCallback, useEffect } from 'react';
import { UserContext } from '../lib/context';


export default function CreatePost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [isValidTitle, setIsValidTitle] = useState(false);
    const uid = auth.currentUser.uid;
    const slug = encodeURI(kebabCase(title));

    useEffect(() => {
        checkTitle(title, slug);
    }, [title])

    
    const checkTitle = useCallback(
        debounce (async (title, slug) => {
            if (title.length >= 5 && title.length <= 80) {
                setIsLoading(true);
                const slugRef = firestore.collection('users').doc(uid).collection('posts').doc(slug);
                const { exists } = await slugRef.get();
                console.log('Firestore read executed');
                setIsValidTitle(!exists);
                setIsLoading(false);
            } else {
                setIsValidTitle(false);
            }
        }, 500), 
    []);

    const submitPost = async (e) => {
        e.preventDefault();
        const slugRef = firestore.collection('users').doc(uid).collection('posts').doc(slug);
        const data = {
            title: title,
            content: '', 
            username: username,
            uid: uid,
            slug: slug,
            published: false,
            updatedAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            heartCount: 0
        }
        try {
            await slugRef.set(data);
            toast.success('Post created successfully!');
            router.push(`/admin/${slug}`);
        } catch (error) {
            toast.error(`Error encountered while attempting to write to Firebase: ${error}`);
            throw error;
        }
    }
    
    return (
        <form onSubmit={submitPost}>
            <input placeholder='Enter title here' spellCheck='false' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <button type='submit' disabled={!isValidTitle} className='btn-standard'>Create a new post</button>
            {(!isValidTitle && title.length) ? 
                <p className='text-danger'>Titles must be unique and consist of between 5 and 80 characters.</p> :
                null
            }
        </form>
    );
}