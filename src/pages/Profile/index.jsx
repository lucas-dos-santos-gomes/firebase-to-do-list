import { useState } from "react";
import { auth } from "../../contexts/firebase";
import FileInput from "../../components/FileInput";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(null);
  const [user] = useState(auth.currentUser);

  const handleLogout = async() => {
    setIsLoading(true);
    await auth.signOut();
    setIsLoading(null);
  }

  return (
    <>
      <div style={{display: 'flex'}}>
        <img style={{borderRadius: '50px', width: '100px'}} src={user.photoURL ?? "/profile-dark.png"} alt="Foto de perfil" />
        <FileInput />
      </div>

      <h1>Seja bem vindo{user.displayName && ', ' + user.displayName}!</h1>
      <h2>Seu e-mail: {user.email}</h2>
      <p>Profile</p>
      <button type="submit" onClick={handleLogout} disabled={isLoading}>{isLoading ? 'Deslogando...' : 'Deslogar'}</button>
    </>
  );
}
