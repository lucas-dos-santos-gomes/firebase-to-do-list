import styled, { css } from "styled-components";
import { themes } from "../../styles/themes";

const googleButtonStyles = css`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

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
    background-color: ${({ $component, theme }) => $component === 'Sign-up' && themes[theme].color.secondary || $component === 'Sign-in' && themes[theme].color.primary};
  }
  & > main > header > span:last-child {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: ${({ $component, theme }) => $component === 'Sign-in' && themes[theme].color.secondary || $component === 'Sign-up' && themes[theme].color.primary};
  }

  & > main > header > span > img {
    width: 20px;
  }

  & > main > section {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    padding: 30px;
  }

  & > main > section > img {
    width: 70px;
  }

  & > main > section > h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => themes[theme].fontColor.primary};
  }
`;

export const Button = styled.button`
  & {
    ${({ $google }) => $google && googleButtonStyles}
    width: 100%;
    padding: 15px 25px;
    border-radius: ${themes.button.borderRadius};
    font-size: 1.6rem;
    background-color: ${({ theme, $google })=> $google? themes.button.google[theme] : themes.button.color.blue};
    cursor: pointer;
  }
  &:hover {
    filter: brightness(1.2);
    ${({ $google }) => $google && css`box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);`};
  }
  &:disabled {
    filter: brightness(.6);
  }
  & > img {
    width: 20px;
  }
`;