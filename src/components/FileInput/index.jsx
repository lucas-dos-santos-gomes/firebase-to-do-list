import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { auth } from '../../contexts/firebase';

const storage = getStorage();

export const FileInput = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `imgs/${auth.currentUser.uid}/profile`);
    uploadBytes(storageRef, image).then((snapshot) => {
      const url = `${snapshot.ref._service._protocol}://${snapshot.ref.storage.host}/v0/b/${snapshot.ref.bucket}/o/${snapshot.ref.fullPath.replaceAll('/', '%2F')}?alt=media`;
      auth.currentUser.updateProfile({ photoURL: url });
      setImageUrl(url);
    });
  };

  return (
    <div>
      <input type="file" accept='image/*' onChange={handleImageChange} capture />
      <button onClick={handleUpload} disabled={!image}>Upload Profile Picture</button>
      {imageUrl && <img src={imageUrl} alt="Profile Picture" />}
    </div>
  );
};