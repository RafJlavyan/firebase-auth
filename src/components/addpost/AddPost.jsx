import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useOutletContext } from "react-router-dom";

const AddPost = () => {
  const photoRef = useRef();
  const postlist = collection(db, "posts");
  const [text, setText] = useState("");
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const file = photoRef.current.files[0];
    if (!file) {
      return;
    }

    const storageRef = ref(storage, `${Date.now + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", null, null, () => {
      console.log("Uploaded...");

      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await addDoc(postlist, {
          userId: user,
          photo: downloadURL,
          title: text,
          likes: [],
        });
        setText("");
        photoRef.current.value = "";
        setLoading(false);
      });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        fullWidth
        variant="filled"
        label="What's on your mind ?"
      />
      <input type="file" ref={photoRef} />
      <div>
        <Button
          disabled={loading}
          variant="contained"
          color="secondary"
          type="submit"
        >
          POST
        </Button>
      </div>
    </form>
  );
};

export default AddPost;
