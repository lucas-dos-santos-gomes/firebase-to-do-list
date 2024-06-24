import { Link } from 'react-router-dom';
import * as S from './style';
import { RoundImage } from '../../styles/round-image';
import HamburguerMenu from '../HamburguerMenu';

export default function Header({ user, title }) {
  return (
    <S.Header>
      <Link to="/profile">
        <RoundImage height={35} src={user.photoURL ?? "/profile-dark.png"} alt="Foto de perfil" />
      </Link>
      <h1>{title}</h1>
      <HamburguerMenu />
    </S.Header>
  );
};