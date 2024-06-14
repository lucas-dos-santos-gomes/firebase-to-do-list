import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { auth } from "../contexts/auth";

import Login from "../pages/login";
import Tasks from "../pages/tasks";
import Profile from "../pages/profile";

export default function Routers() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Tasks /> : <Login />} />
        <Route path="/tasks" element={<Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}