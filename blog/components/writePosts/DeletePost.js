import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function DeletePost({ postRef }) {
    const router = useRouter();

    const postDeletion = async () => {
        const confirmation = window.confirm('Are you sure you want to permanently delete this post? This cannot be undone!');
        if (confirmation) {
            await postRef.delete()
            .then(router.push('/admin'))
            .then(toast.info('Post deleted successfully.'));
        }
    }

    return (
        <button className='btn-red' onClick={postDeletion}>Delete post</button>
    );
}