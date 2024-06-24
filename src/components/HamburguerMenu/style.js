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
`;