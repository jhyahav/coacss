import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import ImageUploader from './ImageUploader';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { serverTimestamp } from '../lib/firebase';

export default function PostForm({ postDefaults, postRef, preview }) {
    const router = useRouter();
    const {register, handleSubmit, watch, reset, formState } = useForm({ defaultValues: postDefaults, mode: 'onChange' });
    const {isValid, isDirty, errors} = formState;
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
                <ImageUploader />
                <textarea name='content' {...register('content', {
                    required: {value: true, message:'Your post needs to have some content!'},
                    maxLength: {value: 15000, message:'Content is too long.'},
                    minLength: {value: 10, message:'Your post must be at least 10 characters long.'}
                })
                }>
                </textarea>
                {errors.content && <p className='text-danger'>{errors.content.message}</p>}
                <fieldset>
                    <input className='checkbox' name='published' type='checkbox' {...register('published')}></input>
                    <label>Published</label>
                </fieldset>
                <button type='submit' className='btn-green' disabled={!isValid || !isDirty}>
                    Save changes
                </button>
            </div>

        </form>
    );
}