import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import { useState } from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";

export default function ImageUploader() {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);

    const uploadFile = async (e) => {
        const file = Array.from(e.target.files)[0];
        const extension = file.type.split('/')[1];
        const storageRef = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now}.${extension}`);

        setIsUploading(true);
        const task = storageRef.put(file);
        task.on(STATE_CHANGED, (snapshot) => {
           const progressPercent = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
           setProgress(progressPercent);
        });
        task
        .then((d) => storageRef.getDownloadURL())
        .then((url) => {
            setDownloadURL(url);
            setIsUploading(false);
            toast.success('Image uploaded successfully!');
        })
    }

    return (
        <div className='box'>
            <Loader show={isUploading} />
            
            {isUploading &&
            <p>{progress}%</p>
            }

            {!isUploading &&
            <>
                <label className='btn-standard'>
                    Upload an image
                    <input type='file' onChange={(e) => uploadFile(e)} accept='image/*'></input>
                </label>
            </>
            }

            {downloadURL &&
                <code className='download-url'>![Alt text]({downloadURL})</code>
            }
        </div>
    );
}