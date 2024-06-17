import styled from "styled-components";
import { themes } from "../../styles/themes";

export const Container = styled.div`
  & {
    display: grid;
    place-items: center;

    width: 100vw;
    height: 100vh;
    
    background-image: ${({ theme }) => `url(/login-bg-${theme}.${theme === 'dark' ? 'webp' : 'jpg'})`};
    background-size: cover;
    background-repeat: no-repeat;
  }

  & > main {
    padding: 30px;
    border-radius: 20px;
    background-color: ${({ theme }) => themes[theme].color.primary};
  }

  & input::before {
    content: 'oi';
    position: absolute;
    width: 100px;
    height: 12px;
  }
`;