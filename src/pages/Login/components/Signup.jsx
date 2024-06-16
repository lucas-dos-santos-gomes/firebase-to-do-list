import { useEffect, useRef, useState } from "react";
import { auth } from "../../../contexts/firebase";
import { authError } from "../../../functions";

export default function Signup() {
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
      <form onSubmit={handleRegister}>
        <input ref={inputRef} id="name" type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} maxLength={50} required />
        <input id="email" type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} maxLength={50} onFocus={() => setError(error.filter(e => e === 'Você precisa colocar seu nome completo.' || e === 'As senhas precisam ser iguais.'))} required />
        <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} minLength={8} maxLength={24} required />
        <input id="confirm_password" type="password" placeholder="Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={8} maxLength={24} required />
        <button type="submit" disabled={loading || differentPasswords || !completeName}>{loading ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>
      {error && error.map((e,i) => <p key={i}>{e}</p>)}
    </>
  );
}