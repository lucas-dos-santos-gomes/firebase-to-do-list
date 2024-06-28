import styled, { keyframes } from "styled-components";
import { themes } from "../../styles/themes";

const pulse = keyframes`
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(255,0,0, 1);
  }
  95% {
    -webkit-box-shadow: 0 0 0 20px rgba(0,200,0, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(0,200,0, 0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 60px);
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  max-width: 400px;
  padding: 10px;
`;

export const ListSection = styled.section`
  height: 75%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    margin-left: 5px;
    background-color: ${themes.button.color.lightBlue};

    border-radius: 8px;
    border-top: 2px solid ${({ theme }) => themes[theme].color.primary};
    border-bottom: 2px solid ${({ theme }) => themes[theme].color.primary};
    border-left: 5px solid ${({ theme }) => themes[theme].color.primary};
    border-right: 5px solid ${({ theme }) => themes[theme].color.primary};
  }

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;

  width: 100%;
  height: 50px;
  padding: 0 15px;
  border-radius: 5px;

  background-color: ${({ theme, completed }) => completed === 'true'? '#0F0' : themes.input[theme].background};
  transition-duration: .2s;

  & > input:first-child {
    display: none;
  }

  & > label {
    display: grid;
    place-items: center;

    width: 25px;
    height: 25px;
    border-radius: ${themes.button.borderRadius};
    border: 2px solid ${themes.dark.color.primary};

    background-color: ${({ completed }) => completed === 'true'? themes.dark.color.primary : 'none'};
    color: #FFF;
    transition-duration: .2s;
    cursor: pointer;
  }

  & > input:nth-child(3) {
    flex-grow: 1;
    font-size: 16px;
    background: none;
    text-decoration: ${({ completed }) => completed === 'true'? 'line-through' : 'none'};

    &:focus {
      outline: none;
    }
  }

  & > button {
    background: none;
    cursor: pointer;

    &:hover {
      color: #f00;
    }
  }
`;

export const DeleteButton = styled.button`
  align-self: flex-end;

  width: 50px;
  height: 50px;
  border-radius: ${themes.button.borderRadius};

  visibility: ${({ visibility }) => visibility === 'true' && 'hidden'};
  background-color: #F00;
  cursor: pointer;

  &:hover:not(:disabled) {
    animation: ${pulse} 1.5s infinite;
  }

  &:disabled {
    opacity: 0.4;
  }
`;
