import { useState } from "react";

export default function Signup() {
  const [loading, setLoading] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef();

  return (
    <>
      <form onSubmit={handleRegister}>
        <input ref={inputRef} id="name" type="text" placeholder="Nome completo" value={name} onChange={e => setName(e.target.value)} maxLength={50} />
        <input id="email" type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} maxLength={50} required />
        <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} minLength={8} maxLength={24} onFocus={handleError} required />
        <input id="confirm_password" type="password" placeholder="Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={8} maxLength={24} onFocus={handleError} required />
        <button type="submit" disabled={loading && true} >{loading ? 'Entrando...' : 'Entrar'}</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}