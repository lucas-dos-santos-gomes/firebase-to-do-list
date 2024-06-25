import styled from "styled-components";
import { themes } from "../../styles/themes";

export const Container = styled.main`
  display: grid;
  place-items: center;

  width: 100vw;
  height: 100vh;
  font-size: 3rem;
  
  background-color: ${({ theme }) => themes[theme].color.primary};
  color: ${({ theme }) => themes[theme].fontColor.primary};
  transition: none;
`;