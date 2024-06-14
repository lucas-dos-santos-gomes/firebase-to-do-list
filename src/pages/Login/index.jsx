import { useState } from "react";
import { auth } from "../../contexts/auth";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleAuth = async(e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch(err) {
      setError(err.message);
    }
};

  return (
    <div>
      <main>
        <img src="" alt="" />
        <h1>Entre com sua conta</h1>
        <form onSubmit={handleAuth}>
          <input id="email" type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} maxLength={50} required />
          <input id="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} minLength={8} maxLength={24} required />
          <button type="submit">Entrar</button>
        </form>
        {error && <p>{error}</p>}
      </main>
    </div>
  );
}