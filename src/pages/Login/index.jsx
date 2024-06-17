import { useContext, useState } from "react";
import { googleLogin } from "../../contexts/firebase";
import { ThemeContext } from "../../contexts/theme";
import Sigin from "./components/Signin";
import Signup from "./components/Signup";
import * as S from "./style";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const [component, setComponent] = useState(true);
  const [error, setError] = useState(null);

  const handleGoogleSign = async() => {
    try {
      await googleLogin();
    } catch(err) {
      console.error(err.message);
      setError(err.message);
    }
};
  
  return (
    <S.Container theme={theme}>
      <main>
        <img src={`/profile-${theme}.png`} alt="" />
        <h1>{component ? 'Entre com sua conta' : 'Cadastre-se'}</h1>
        {component ? <Sigin /> : <Signup />}
        <br />
        <button onClick={() => setComponent(!component)}>Ir para página de {component ? 'cadastro' : 'login'}</button>
        <br /><br />
        <button onClick={handleGoogleSign}>Fazer Login com Google</button>
        {error && <p>{error}</p>}
      </main>
    </S.Container>
  );
}