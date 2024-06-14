import { useEffect, useState } from "react";
import { auth } from "../../contexts/auth";

export default function Tasks() {
  const [seconds, setSeconds] = useState(5);

  const handleLogout = async() => {
    if(seconds > 0) {
      await new Promise(setTimeout(() => setSeconds(seconds-1), 1000));
    } else {
      auth.signOut();
    }
  }

  useEffect(() => {
    handleLogout();
  });

  return (
    <>Tasks {seconds}</>
  );
}