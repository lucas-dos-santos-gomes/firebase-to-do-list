import * as PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";

import { auth } from "../../../contexts/firebase";
import { authError } from "../../../functions";

import SignInput from "../../../components/SignInput";
import * as S from "../style";

export default function Sigin({ children }) {
  const [loading, setLoading] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    error && inputRef.current?.focus();
  }, [error]);

  return (
    <>
      <form onSubmit={handleLogin} style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
        <SignInput 
          ref={inputRef} 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <SignInput 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          onFocus={handleError} 
          required 
        />
        <S.Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</S.Button>
      </form>
      {children}
      {error && <p>{error}</p>}
    </>
  );
}

Sigin.propTypes = {
  children: PropTypes.func.isRequired
};