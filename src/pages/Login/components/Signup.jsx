import * as PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { auth } from "../../../contexts/firebase";
import { authError } from "../../../functions";

import SignInput from "../../../components/SignInput";
import * as S from "../style";

export default function Signup({ children }) {
  const [isLoading, setIsLoading] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [completeName, setCompleteName] = useState(null);
  const [differentPasswords, setDifferentPasswords] = useState(null);
  const [error, setError] = useState([]);
  const inputRef = useRef();

  const resetInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await auth.createUserWithEmailAndPassword(email.trim(), password);
      const user = auth.currentUser;
      await user.updateProfile({ displayName: name.trim() });
    } catch(err) {
      setError([authError(err.message, false), ...error]);
      resetInputs();
      inputRef.current.focus();
    } finally {
      setIsLoading(null);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if(name.trim().includes(' ') || name.length < 1) {
      setError(err => err.filter(e => e !== 'Você precisa colocar seu nome completo.'));
      setCompleteName(true);
      return;
    }
    setCompleteName(null);
    setError(err => ['Você precisa colocar seu nome completo.', ...err.filter(e => e !== 'Você precisa colocar seu nome completo.')]);
  }, [name]);

  useEffect(() => {
    if(confirmPassword.length > 0 && confirmPassword !== password) {
      setDifferentPasswords(true);
      setError(err => [...err.filter(e => e !== 'As senhas precisam ser iguais.'), 'As senhas precisam ser iguais.']);
      return;
    }
    setDifferentPasswords(null);
    setError(err => err.filter(e => e !== 'As senhas precisam ser iguais.'));
  }, [password, confirmPassword]);

  return (
    <>
      <S.Form onSubmit={handleRegister}>
        <SignInput 
          ref={inputRef}
          type="text" 
          placeholder="Nome completo" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          user 
        />
        <SignInput 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          onFocus={() => setError(error.filter(e => e === 'Você precisa colocar seu nome completo.' || e === 'As senhas precisam ser iguais.'))} 
          required 
        />
        <SignInput 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
        />
        <SignInput 
          type="password" 
          placeholder="Confirme a senha" 
          value={confirmPassword} 
          onChange={e => setConfirmPassword(e.target.value)} 
          required 
        />
        <S.Button type="submit" disabled={isLoading || differentPasswords || !completeName}>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</S.Button>
      </S.Form>
      <p>- ou -</p>
      {children}
      {error.length < 1 || <ul>{error.map((e,i) => <li className="error" key={i}>{e}</li>)}</ul>}
    </>
  );
}

Signup.propTypes = {
  children: PropTypes.object.isRequired
};