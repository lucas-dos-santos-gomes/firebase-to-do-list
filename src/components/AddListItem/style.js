import styled from "styled-components";
import { themes } from "../../styles/themes";

export const FormContainer = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  flex-grow: 1;

  padding: 0 15px;
  border-radius: 5px;

  font-size: 18px;
  background-color: ${({ theme }) => themes.input[theme].background};
  opacity: .4;
  transition-duration: .2s;

  &:focus {
    opacity: 1;
  }

  &::placeholder {
    color: ${({ theme }) => themes[theme].fontColor.placeholder};
  }
`;

export const InputButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 5px;

  background-color: ${themes.button.color.lightBlue};
  color: ${themes.dark.color.primary};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
  }
`;
