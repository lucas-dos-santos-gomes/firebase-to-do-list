import * as PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";

import { auth } from "../../../contexts/firebase";
import { authError } from "../../../functions";

import SignInput from "../../../components/SignInput";
import * as S from "../style";

export default function Sigin({ children }) {
  const [isLoading, setIsLoading] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const handleError = () => setError(null);

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await auth.signInWithEmailAndPassword(email.trim(), password);
    } catch(err) {
      setError(authError(err.message, true));
      setEmail('');
      setPassword('');
    } finally {
      setIsLoading(null);
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
      <S.Form onSubmit={handleLogin}>
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
        <S.Button type="submit" disabled={isLoading}>{isLoading ? 'Entrando...' : 'Entrar'}</S.Button>
      </S.Form>
      <p>- ou -</p>
      {children}
      {error && <p className='error'>{error}</p>}
    </>
  );
}

Sigin.propTypes = {
  children: PropTypes.object.isRequired
};