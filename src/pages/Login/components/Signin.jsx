import { useEffect, useRef, useState } from "react";
import { auth } from "../../../contexts/auth";

export default function Sigin() {
  const [loading, setLoading] = useState(null);
  const [email, setEmail] = useState('lucas.gomes247@etec.sp.gov.br');
  const [password, setPassword] = useState('1234567890');
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const handleAuth = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
    } catch(err) {
      console.error(err.message);
      setEmail('');
      setPassword('');
      if(err.message.includes('(auth/invalid-credential)')) {
        setError('A credencial de autenticação fornecida está incorreta, malformada ou expirou.');
      } else if(err.message.includes('(auth/too-many-requests)')) {
        setError('O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde.');
      } else {
        setError('Houve um erro na autenticação.');
      }
    } finally {
      setLoading(null);
    }
  };

  const handleError = () => setError(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    error && inputRef.current.focus();
  }, [error]);

  return (
    <div>
      <main>
        <img src="" alt="" />
        <h1>Entre com sua conta</h1>
        <form onSubmit={handleAuth}>
          <input ref={inputRef} id="email" type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} maxLength={50} required />
          <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} minLength={8} maxLength={24} onFocus={handleError} required />
          <button type="submit" disabled={loading && true} >{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}