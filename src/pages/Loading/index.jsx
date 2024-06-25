import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/theme";
import * as S from './style';

export default function Loading() {
  const { theme } = useContext(ThemeContext);
  const [dots, setDots] = useState(1);

  const dot = ['.', '..', '...'];

  setInterval(() => {
    dots < 3 && setDots(dots+1);
    dots < 3 || setDots(1); 
  }, 500);

  return (
    <S.Container theme={theme}>
      <h1>Carregando{dot[dots]}</h1>
    </S.Container>
  );
};