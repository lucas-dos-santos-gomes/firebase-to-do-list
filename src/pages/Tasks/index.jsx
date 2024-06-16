import { useEffect, useState } from "react";
import { auth } from "../../contexts/firebase";

export default function Tasks() {
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
    await auth.signOut();
    setLoading(null);
  }

  useEffect(() => {
    handleCount();
  });


  return (
    <>
      <h1>Seja bem vindo{user.displayName ? ', ' + user.displayName : '!'}</h1>
      <p>Tasks {seconds}</p>
      <button type="submit" onClick={handleLogout} disabled={loading}>{loading ? 'Deslogando...' : 'Deslogar'}</button>
    </>
  );
}