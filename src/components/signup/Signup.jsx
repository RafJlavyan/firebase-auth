import { useState } from "react";
import { db } from "../../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const [user, setuser] = useState({
    name: "",
    surname: "",
    mail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const userList = collection(db, "users");

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, user.mail, user.password)
      .then(async (r) => {
        setError('')
        await addDoc(userList, {
          name: user.name,
          surname: user.surname,
          profilePicture: "",
          userId: r.user.uid,
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            color="secondary"
            label="name"
            value={user.name}
            onChange={(e) => setuser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <TextField
            color="secondary"
            label="surname"
            value={user.surname}
            onChange={(e) => setuser({ ...user, surname: e.target.value })}
          />
        </div>
        <div>
          <TextField
            type="mail"
            color="secondary"
            label="Email"
            required
            value={user.mail}
            onChange={(e) => setuser({ ...user, mail: e.target.value })}
          />
        </div>
        <div>
          <TextField
            type="password"
            color="secondary"
            label="password"
            required
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
          />
        </div>
        <div>
          <Button color="secondary" type="submit" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
