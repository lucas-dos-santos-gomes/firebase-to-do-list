import styled from "styled-components";
import { themes } from "../../styles/themes";

export const Container = styled.div`
  & {
    background-color: ${({ theme }) => themes[theme].color.secondary};
  }
  & > span {}
`;

export const Input = styled.input`
  & {

  }
  &:invalid {}
  &::placeholder {}
`;