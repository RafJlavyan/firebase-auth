import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Gallery from "../gallery/Gallery";

const Profile = () => {
  const { user } = useOutletContext();
  const [account, setAccount] = useState(null);
  const defaultPicture =
    "https://www.shareicon.net/data/512x512/2016/05/24/770137_man_512x512.png";

  const userList = collection(db, "users");

  const getUserProfile = async () => {
    const q = query(userList, where("userId", "==", user));
    const info = await getDocs(q);
    if (info.size > 0) {
      const obj = info.docs[0];
      setAccount({ ...obj.data(), id: obj.id });
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="grid">
      <div>
        {!account ? (
          <p>Please wait loading...</p>
        ) : (
          <div>
            <img
              src={
                account.profilePicture ? account.profilePicture : defaultPicture
              }
              className="account-picture"
            />
            <h1>
              {account.name} {account.surname}
            </h1>
          </div>
        )}
      </div>
      <Gallery />
    </div>
  );
};

export default Profile;
