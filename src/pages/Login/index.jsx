import { useContext, useState } from "react";

import { googleLogin } from "../../contexts/firebase";
import { ThemeContext } from "../../contexts/theme";

import Sigin from "./components/Signin";
import Signup from "./components/Signup";

import * as S from "./style";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const [component, setComponent] = useState('Sign-in');
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
    <S.Container theme={theme} component={component}>
      <main>
        <header>
          <span className="Sign-in" onClick={e => setComponent(e.target.className)}>
            <img className="Sign-in" src={`/svg/signin-${theme}.svg`} alt="Ícone entrar" />
            Entrar
          </span>
          <span className="Sign-up" onClick={e => setComponent(e.target.className)}>
            <img className="Sign-up" src={`/svg/signup-${theme}.svg`} alt="Ícone cadastrar" />
            Cadastrar
          </span>
        </header>
        <section>
          <img src={`/profile-${theme}.png`} alt="Imagem de perfil" />
          <h1>{component === 'Sign-in' ? 'Entre com sua conta' : 'Cadastre-se'}</h1>
          {component === 'Sign-in' ? 
            (<Sigin>
              <S.Button onClick={handleGoogleSign} theme={theme} google>
                <img src="/svg/google.svg" alt="Ícone do Google" />
                Fazer Login com Google
              </S.Button>
            </Sigin>) : 
            (<Signup>
              <S.Button onClick={handleGoogleSign} theme={theme} google>
                <img src="/svg/google.svg" alt="Ícone do Google" />
                Fazer Login com Google
              </S.Button>
            </Signup>)}
          {error && <p>{error}</p>}
        </section>
      </main>
    </S.Container>
  );
}