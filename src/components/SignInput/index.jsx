import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme";
import * as S from "./style";

export default function SignInput() {
  const { theme } = useContext(ThemeContext);

  return (
    <S.Container theme={theme}>
      <span></span>
      <S.Input />
    </S.Container>
  );
}