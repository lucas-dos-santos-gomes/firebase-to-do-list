import { useEffect, useState } from "react";
import { auth } from "../../contexts/auth";

export default function Tasks() {
  const [seconds, setSeconds] = useState(5);
  const [user, setUser] = useState(auth.currentUser);

  const handleLogout = () => {
    setUser(auth.currentUser);
    if(seconds > 0) {
      setTimeout(() => setSeconds(seconds-1), 1000);
    } else {
      auth.signOut();
    }
  }

  useEffect(() => {
    handleLogout();
  });


  return (
    <>
      <h1>Seja bem vindo{user.displayName ? ', ' + user.displayName : '!'}</h1>
      Tasks {seconds}
    </>
  );
}