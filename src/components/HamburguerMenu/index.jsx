import { useState } from 'react';
import * as S from './style';

export default function HamburguerMenu() {
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
    </>
  );
}