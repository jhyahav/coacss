import styles from "../../styles/Admin.module.scss";
import { auth, storage, STATE_CHANGED } from "../../lib/firebase";
import { useState } from "react";
import Loader from "../general/Loader";
import { toast } from "react-toastify";

export default function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);
  const [fileName, setFileName] = useState("file");

  const uploadFile = async (e) => {
    const file = Array.from(e.target.files)[0];
    const name = file.name;
    const extension = file.type.split("/")[1];
    const storageRef = storage.ref(
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );

    setIsUploading(true);
    const task = storageRef.put(file);
    task.on(STATE_CHANGED, (snapshot) => {
      const progressPercent = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(progressPercent);
    });
    task
      .then((d) => storageRef.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setFileName(name);
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      });
  };

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.textContent);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="box">
      <Loader show={isUploading} />

      {isUploading && <p>{progress}%</p>}

      {!isUploading && (
        <>
          <label className="btn btn-standard">
            Upload an image
            <input
              className={styles.image_input}
              type="file"
              onChange={(e) => uploadFile(e)}
              accept="image/*"
            ></input>
          </label>
        </>
      )}

      {downloadURL && (
        <label className={styles.download_label}>
          Copy the markdown below by clicking it, then paste it into your post:
          <code className={styles.url} onClick={(e) => copyToClipboard(e)}>
            ![{fileName}]({downloadURL})
          </code>
        </label>
      )}
    </div>
  );
}
