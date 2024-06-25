import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "../contexts/firebase";

import Login from "../pages/Login";
import Tasks from "../pages/Tasks";
import Shopping from "../pages/Shopping";
import Profile from "../pages/Profile";

export default function Routers() {
  const [user, setUser] = useState(false);

  useEffect(() => { 
    return auth.onAuthStateChanged(user => setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Navigate to="tasks" /> : <Login />} />
        <Route path="/tasks" element={user ? <Tasks /> : user ?? <Navigate to="/" />} />
        <Route path="/shopping" element={user ? <Shopping /> : user ?? <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : user ?? <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}