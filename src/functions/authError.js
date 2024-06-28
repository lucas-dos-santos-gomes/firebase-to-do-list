export const authError = (messageError, isLogin) => {
  console.error(messageError);
  if(messageError.includes('(auth/invalid-credential)')) {
    return 'A credencial de autenticação fornecida está incorreta, malformada ou expirou.';
  } else if(messageError.includes('(auth/too-many-requests)')) {
    return 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde.';
  } else if(messageError.includes('(auth/invalid-email')) {
    return 'O endereço de e-mail está mal formatado.';
  } else if(isLogin) {
    return 'Houve um erro na autenticação.';
  } else if(messageError.includes('(auth/email-already-in-use)')) {
    return 'Esse endereço de E-mail já está cadastrado.';
  } else if(messageError.includes('(auth/popup-closed-by-user)')) {
    return 'Você fechou o pop-up antes de finalizar a operação.';
  } else {
    return 'Houve um problema na criação da conta. Tente novamente.';
  };
};