import { useState } from "react";
import Sigin from "./components/Signin";
import Signup from "./components/Signup";

export default function Login() {
  const [component, setComponent] = useState(true);
  
  return (
    <>
      <main>
        <img src="/profile-dark.png" alt="" />
        <h1>{component ? 'Entre com sua conta' : 'Cadastre-se'}</h1>
        {component ? <Sigin /> : <Signup />}
        <br />
        <button onClick={() => setComponent(!component)}>Ir para página de {component ? 'cadastro' : 'login'}</button>
      </main>
    </>
  );
}