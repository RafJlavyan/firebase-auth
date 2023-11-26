import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { Button } from "@mui/material";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useOutletContext();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [didILike, setDidILike] = useState(false);

  const getPostInfo = async () => {
    const item = doc(db, "posts", id);
    const obj = await getDoc(item);
    if (!obj._document) {
      return navigate("/profile");
    }
    if (obj.data().likes.includes(user)) {
      setDidILike(true);
    }
    setPost(obj.data());
  };

  useEffect(() => {
    getPostInfo();
  }, []);

  const handleLike = async () => {
    const currentPost = doc(db, "posts", id);
    let likes = [...post.likes, user];
    await updateDoc(currentPost, { likes });
    setDidILike(true);
    setPost({ ...post, likes: likes });
  };

  const handleUnlike = async () => {
    const currentPost = doc(db, "posts", id);
    let temp = [...post.likes];
    temp.splice(post.likes.indexOf(user), 1);
    await updateDoc(currentPost, { likes: temp });
    setDidILike(false);
    setPost({ ...post, likes: [...temp] });
  };

  return (
    <div>
      {post && (
        <div className="post">
          {didILike ? (
            <Button variant="contained" onClick={handleUnlike}>Unlike</Button>
          ) : (
            <Button variant="contained" onClick={handleLike}>
              Like
            </Button>
          )}
          <h3>
            {post.title} ({post.likes.length} LIKES)
          </h3>
          <img src={post.photo} />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
