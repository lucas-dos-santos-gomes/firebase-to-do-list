import { useEffect, useRef, useState } from "react";
import { auth } from "../../../contexts/firebase";
import { authError } from "../../../functions";
import SignInput from "../../../components/SignInput";

export default function Sigin() {
  const [loading, setLoading] = useState(null);
  const [email, setEmail] = useState('lucas.gomes247@etec.sp.gov.br');
  const [password, setPassword] = useState('1234567890');
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const handleError = () => setError(null);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email.trim(), password);
    } catch(err) {
      setError(authError(err.message, true));
      setEmail('');
      setPassword('');
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    error && inputRef.current.focus();
  }, [error]);

  return (
    <>
      <form onSubmit={handleLogin}>
        <SignInput />


        <input ref={inputRef} id="email" type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} maxLength={50} required />
        <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} minLength={8} maxLength={24} onFocus={handleError} required />
        <button type="submit" disabled={loading} >{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}