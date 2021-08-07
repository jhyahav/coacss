import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { firestore, serverTimestamp } from '../lib/firebase';

export default function PostForm({ postDefaults, postRef, preview }) {
    const router = useRouter();
    const {register, handleSubmit, watch, reset } = useForm({ defaultValues: postDefaults, mode: 'onChange' });
    const updatePost = async ({ content, published }) => {
        await postRef.update({
            content,
            published,
            updatedAt: serverTimestamp(),
        });
        reset({ content, published });
        toast.success('Changes saved!');
        const redirect = published ? `/${postDefaults.username}/${postDefaults.slug}` : '/admin';
        router.push(redirect);
    }
    return (
        <form onSubmit={handleSubmit(updatePost)}>
            {preview && (
                <div className='card'>
                    <ReactMarkdown>{watch('content')}</ReactMarkdown>
                </div>
            )}

            <div className={preview ? 'hidden' : 'post-controls'}>
                <textarea name='content' {...register('content')}> </textarea>
                <fieldset>
                    <input className='checkbox' name='published' type='checkbox' {...register('published')}></input>
                    <label>Published</label>
                </fieldset>
                <button type='submit' className='btn-green'>
                    Save changes
                </button>
            </div>

        </form>
    );
}