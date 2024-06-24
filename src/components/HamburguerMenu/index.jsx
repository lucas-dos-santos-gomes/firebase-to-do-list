import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as S from './style';

export default function HamburguerMenu({path, pathname}) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <S.Menu className={active && 'clicked'} onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
      </S.Menu>
      {active && (<S.Modal>
        <Link to={path}>{pathname}</Link>
      </S.Modal>)}
    </>
  );
}