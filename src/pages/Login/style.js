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
    border-radius: 30px;
    background-color: ${({ theme }) => themes[theme].color.primary};
  }

  & > main > header {
    display: flex;
    font-size: 1.6rem;
    height: 50px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: ${({ theme }) => `linear-gradient(to bottom, ${themes[theme].color.secondary} 50%, ${themes[theme].color.primary} 50%)`};
  }
  
  & > main > header > span {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    color: ${({ theme }) => themes[theme].fontColor.primary};
    cursor: pointer;
  }
  
  & > main > header > span:first-child {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: ${({ component, theme }) => component === 'Sign-up' ? themes[theme].color.secondary : themes[theme].color.primary};
  }
  & > main > header > span:last-child {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: ${({ component, theme }) => component === 'Sign-in' ? themes[theme].color.secondary : themes[theme].color.primary};
  }

  & > main > header > span > img {
    width: 20px;
  }

  & > main > section {
    padding: 30px;
  }
`;