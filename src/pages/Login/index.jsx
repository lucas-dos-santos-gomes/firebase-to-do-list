export default function Login() {
  return (
    <div>
      <main>
        <img src="" alt="" />
        <h1>Entre com sua conta</h1>
        <form>
          <input id="email" type="email" placeholder="E-mail" />
          <input id="password" type="password" placeholder="Senha" minLength={8} />
          <button type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}