import { auth } from "../contexts/firebase";

export const updateName = (name) => {
  auth.currentUser.updateProfile({
    displayName: name,
  }).then(() => {
    console.log('Nome de usuário atualizado com sucesso');
  }).catch((err) => {
    console.log('Erro ao atualizar o nome do usuário.');
    console.error(err);
  });
}