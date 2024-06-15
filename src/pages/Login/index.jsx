import { useState } from "react";
import Sigin from "./components/Signin";
import Signup from "./components/Signup";

export default function Login() {
  const [component, setComponent] = useState(true);
  
  return (
    <>
      {component ? <Sigin /> : <Signup />}
      <br />
      <button onClick={() => setComponent(!component)}>{component ? 'Ir para página de cadastro' : 'Ir pra página de login'}</button>
    </>
  );
}