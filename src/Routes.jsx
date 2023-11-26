import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Signup from "./components/signup/Signup";
import AuthMiddleware from "./components/AuthMiddleware";
import Settings from "./components/settings/Settings";
import SearchUsers from "./components/searchusers/SearchUsers";
import Account from "./components/account/Account";
import PostDetails from "./components/postdetails/PostDetails";
const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<AuthMiddleware />}>
          <Route path="" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="search" element={<SearchUsers />} />
          <Route path="user/account/:id" element={<Account />} />
          <Route path="post/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
