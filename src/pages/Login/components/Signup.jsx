import * as PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { auth } from "../../../contexts/firebase";
import { authError } from "../../../functions";

import SignInput from "../../../components/SignInput";
import * as S from "../style";

export default function Signup({ children }) {
  const [loading, setLoading] = useState(null);
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
      setLoading(true);
      await auth.createUserWithEmailAndPassword(email.trim(), password);
      const user = auth.currentUser;
      await user.updateProfile({ displayName: name.trim() });
    } catch(err) {
      setError([authError(err.message, false), ...error]);
      resetInputs();
      inputRef.current.focus();
    } finally {
      setLoading(null);
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
      <form onSubmit={handleRegister} style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
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
        <S.Button type="submit" disabled={loading || differentPasswords || !completeName}>{loading ? 'Cadastrando...' : 'Cadastrar'}</S.Button>
      </form>
      {children}
      {error && error.map((e,i) => <p key={i}>{e}</p>)}
    </>
  );
}

Signup.propTypes = {
  children: PropTypes.func.isRequired
};