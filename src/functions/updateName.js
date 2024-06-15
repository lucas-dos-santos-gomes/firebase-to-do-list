import { auth } from "../contexts/auth";

export const updateName = () => {
  auth.currentUser.updateProfile({
    displayName: 'Lucas dos Santos Gomes',
  }).then(function() {
    console.log('Nome de usuário atualizado com sucesso');
  }).catch(function(error) {
    console.log('Erro ao atualizar o nome do usuário', error);
  });
}