import { auth } from "../contexts/firebase";

export const authTimeout = () => {
  const token = localStorage.getItem('token');
  const expiresAt = localStorage.getItem('expiresAt');
  if(token && expiresAt) {
    const now = new Date().getTime();
    if(now > expiresAt) {
      // Token expirado
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      auth.signOut();
    } else {
      localStorage.setItem('expiresAt', new Date().getTime() + 1800000);
    }
  }
}