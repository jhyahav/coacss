import { firestore, increment, auth } from "../lib/firebase";
import { useDocument } from 'react-firebase-hooks/firestore';
import { toast } from "react-toastify";

//IDEA: maybe add heartCount as a prop in order to "fake" real-time count updates on client-side rendered pages?

export default function HeartButton({ postRef }) {
    const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);

    const addHeart = async () => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch();

        batch.update(postRef, { heartCount: increment(1) });
        batch.set(heartRef, { uid });

        await batch.commit()
        .then(() => toast('💘 Hearted!'));
    }

    const removeHeart = async () => {
        const batch = firestore.batch();

        batch.update(postRef, { heartCount: increment(-1) });
        batch.delete(heartRef);

        await batch.commit()
        .then(() => toast('💔 Unhearted'));
    }

    return heartDoc?.exists ? (
        <span className='heart' onClick={removeHeart}>💙 </span>
    ) : (
        <span className='heart' onClick={addHeart}>🤍 </span>  
    );

}