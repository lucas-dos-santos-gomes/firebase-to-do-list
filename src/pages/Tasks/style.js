import styled, { keyframes } from "styled-components";
import { themes } from "../../styles/themes";

const pulse = keyframes`
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(255,0,0, 1);
  }
  98% {
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
`;

export const DeleteButton = styled.button`
  align-self: flex-end;
  width: 50px;
  height: 50px;
  border-radius: ${themes.button.borderRadius};

  background-color: #F00;
  cursor: pointer;

  &:hover:not(:disabled) {
    animation: ${pulse} 1.5s infinite;
  }

  &:disabled {
    opacity: 0.4;
  }
`;
