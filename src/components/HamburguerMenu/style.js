import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  cursor: pointer;

  & > span {
    width: 100%;
    height: 15%;
    border-radius: 10px;
    background-color: #FFF;
    transition: transform .3s linear, opacity .3s linear;
  }

  &.clicked > span:first-child {
    transform: translateY(10px) rotate(45deg);
  }

  &.clicked > span:nth-child(2) {
    opacity: 0;
  }

  &.clicked > span:last-child {
    transform: translateY(-10px) rotate(135deg);
  }
  
  &.clicked::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    z-index: 1;
  }
`;

export const Modal = styled.div`
  /* display: none; */
  position: absolute;
  bottom: -30px;
  right: 10px;
  z-index: 12;

  width: 280px;
  padding-top: 20px;
  border-radius: 10px;
  
  background-color: #FFF;
  cursor: auto;

  &::before {
    border: 10px solid transparent;
    border-bottom-color: #FFF;
    content: "";
    top: -20px;
    right: 15px;
    position: absolute;
    z-index: 12;
  }
`;