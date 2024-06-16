import { useEffect, useState } from "react";
import { auth } from "../../contexts/firebase";

export default function Profile() {
  const [seconds, setSeconds] = useState(5);
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(auth.currentUser);

  const handleCount = () => {
    setUser(auth.currentUser);
    if(seconds > 0) {
      setTimeout(() => setSeconds(seconds-1), 1000);
    }
  }

  const handleLogout = async() => {
    setLoading(true);
    user.refreshToken;
    await auth.signOut();
    setLoading(null);
  }

  useEffect(() => {
    handleCount();
  });


  return (
    <>
      <h1>Seja bem vindo{user.displayName ? ', ' + user.displayName : '!'}</h1>
      <h2>Seu e-mail: {user.email}</h2>
      <p>Profile {seconds}</p>
      <button type="submit" onClick={handleLogout} disabled={loading}>{loading ? 'Deslogando...' : 'Deslogar'}</button>
    </>
  );
}
