import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { db } from "../../firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ mail: "", password: "" });
  const [error, setError] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, user.mail, user.password)
      .then((r) => {
        navigate("/profile");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div style={{ padding: 13 }}>
      <h1>Sign in</h1>
      <Box sx={{ width: 500 }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              fullWidth
              label="Email Address"
              value={user.mail}
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
            />
          </div>
          <div>
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default Login;
