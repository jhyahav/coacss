import { useRouter } from 'next/router';
import { kebabCase } from 'lodash';
import toast from 'react-hot-toast';
import { firestore, auth, serverTimestamp } from "../lib/firebase";
import { useContext, useState } from 'react';
import { UserContext } from '../lib/context';


export default function CreatePost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const slug = encodeURI(kebabCase(title));

    const isValid = title.length > 3 && title.length < 100;
    const submitPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);
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
            await ref.set(data);
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
            <button type='submit' disabled={!isValid} className='btn-standard'>Create a new post</button>
        </form>
    );
}