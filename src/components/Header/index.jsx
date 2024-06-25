import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { RoundImage } from '../../styles/round-image';
import { auth } from '../../contexts/firebase';

import * as S from './style';

export default function Header({ title, path, icon }) {
  const [bounce, setBounce] = useState(false);
  const user = auth.currentUser;

  return (
    <S.Header>
      <Link to="/profile">
        <RoundImage height={35} src={user.photoURL ?? "/profile-dark.png"} alt="Foto de perfil" />
      </Link>
      <h1>{title}</h1>
      <Link to={path}>
        <FontAwesomeIcon 
          onMouseOver={() => setBounce(true)} 
          onMouseLeave={() => setBounce(false)} 
          color='#FFF' size='xl' 
          icon={icon} bounce={bounce} 
        />
      </Link>
    </S.Header>
  );
};