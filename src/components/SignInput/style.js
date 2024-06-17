import styled from "styled-components";
import { themes } from "../../styles/themes";

export const Container = styled.label`
  & {
    display: inline-flex;
    align-items: center;
    gap: 10px;

    padding: 12px 15px;
    border-radius: 50px;

    font-size: 10px;
    background-color: ${({ theme }) => themes[theme].color.secondary};
    
    cursor: pointer;
  }
  &.focus {
    outline: 1.5px solid ${({ theme }) => themes[theme].fontColor.primary};
  }
  & > img {
    width: 20px;
  }
`;

export const Input = styled.input`
  & {
    width: 220px;
    font-size: 1.4em;
    background: none;
    cursor: inherit;
  }
  &:focus {
    border: none;
    outline: none;
  }
  &:invalid {}
  &::placeholder {
    color: ${({ theme }) => themes[theme].color.placeholder};
  }
`;