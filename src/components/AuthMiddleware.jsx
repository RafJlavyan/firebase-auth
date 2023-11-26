import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const AuthMiddleware = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigate("/");
      } else {
        setUser(user.uid);
      }
    });
  });
  return (
    user && (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/profile/settings">Settings</Link>
            </li>
            <li>
              <Link to="/profile/search">Search</Link>
            </li>
            <li onClick={() => signOut(auth)}>Logout</li>
          </ul>
        </nav>
        <Outlet context={{ user }} />
      </>
    )
  );
};

export default AuthMiddleware;
