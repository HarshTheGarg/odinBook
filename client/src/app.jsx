import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Loader from "./pages/Loader/Loader.jsx";
import Home from "./pages/Home/Home.jsx";
import Protect from "./pages/Protect.jsx";
import SignIn from "./pages/Signin/SignIn.jsx";
import OAuthRedirect from "./pages/OAuthRedirect.jsx";
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";

import Find from "./components/Friends/Find/Find.jsx";
import Requests from "./components/Friends/Requests/Requests.jsx";
import AllFriends from "./components/Friends/All/AllFriends.jsx";

import AllPosts from "./components/Post/AllPosts/AllPosts.jsx";

import { tokenExists } from "./lib/authUtils";
import { fetchUser } from "./redux/features/currentUser/cuSlice";

import "./sass/main.sass";
import NotFound from "./pages/NotFound/NotFound.jsx";
import CreatePost from "./components/Post/Create/CreatePost.jsx";
import User from "./pages/User/User.jsx";
import ChangePassword from "./components/ChangePass/ChangePassword.jsx";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cu);

  useEffect(() => {
    if (tokenExists() && (!state || !state.isLoggedIn)) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <BrowserRouter>
      <Loader />
      <Routes>
        {!state.isLoggedIn ? (
          <>
            <Route path="/*" exact element={<SignIn />} />
          </>
        ) : (
          <>
            <Route path="/" exact element={<Home />}>
              <Route index element={<AllPosts />} />
              <Route path="post" exact>
                <Route path="create" element={<CreatePost />}/>
              </Route>
              <Route path="profile" element={<User />} >
                <Route path="passwordChange" element={<ChangePassword />} />
              </Route>

            </Route>

            <Route path="/friends" exact element={<Home />}>
              <Route path="find" exact element={<Find />} />
              <Route path="requests" exact element={<Requests />} />
              <Route path="all" exact element={<AllFriends />} />
            </Route>

            <Route path="/signIn" exact element={<SignIn />} />

            <Route path="/protect" exact element={<Protect />} />

            <Route path="/*" exact element={<NotFound />} />
          </>
        )}
        <Route path="/Unauthorized" element={<Unauthorized />} />
        <Route path="/OAuthRedirect" exact element={<OAuthRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
