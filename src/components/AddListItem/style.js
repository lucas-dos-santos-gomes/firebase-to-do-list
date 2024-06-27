import styled from "styled-components";
import { themes } from "../../styles/themes";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  flex-grow: 1;

  padding: 0 10px;
  border-radius: 5px;

  font-size: 16px;
  background-color: ${({ theme }) => themes.input[theme].background};

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
